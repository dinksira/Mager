const fs = require('fs');
const path = require('path');
const pool = require('./services/db');
const { ensureDatabase } = require('./services/db');

async function seed() {
  await ensureDatabase();

  console.log('Creating tables...');
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  const statements = schema.split(';').filter(s => s.trim());
  for (const stmt of statements) {
    if (stmt.trim().toUpperCase().startsWith('CREATE TABLE')) {
      try { await pool.query(stmt); } catch (e) { console.error('Schema error:', e.message); }
    }
  }

  // Seed content
  console.log('Seeding content...');
  const contentPath = path.join(__dirname, 'data', 'content.json');
  if (fs.existsSync(contentPath)) {
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    const entries = Object.entries(content);
    if (entries.length > 0) {
      const placeholders = entries.map(() => '(?, ?)').join(', ');
      const values = entries.flatMap(([k, v]) => [k, String(v)]);
      await pool.query(
        `INSERT INTO content (\`key\`, \`value\`) VALUES ${placeholders} ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`)`,
        values
      );
    }
    console.log(`  Inserted ${entries.length} content keys`);
  }

  // Seed slides
  console.log('Seeding slides...');
  await pool.query('DELETE FROM slides');
  const slidesPath = path.join(__dirname, 'data', 'slides.json');
  if (fs.existsSync(slidesPath)) {
    const slides = JSON.parse(fs.readFileSync(slidesPath, 'utf8'));
    if (Array.isArray(slides) && slides.length > 0) {
      const placeholders = slides.map((_, i) => '(?, 0, ?)').join(', ');
      const values = slides.flatMap((f, i) => [f, i]);
      await pool.query(`INSERT INTO slides (filename, published, sort_order) VALUES ${placeholders}`, values);
      console.log(`  Inserted ${slides.length} staging slides`);
    }
  }

  const livePath = path.join(__dirname, 'data', 'slides-live.json');
  if (fs.existsSync(livePath)) {
    const live = JSON.parse(fs.readFileSync(livePath, 'utf8'));
    if (Array.isArray(live) && live.length > 0) {
      const placeholders = live.map((_, i) => '(?, 1, ?)').join(', ');
      const values = live.flatMap((f, i) => [f, i]);
      await pool.query(`INSERT INTO slides (filename, published, sort_order) VALUES ${placeholders}`, values);
      console.log(`  Inserted ${live.length} live slides`);
    }
  } else {
    // Copy staging as live if no live file exists
    const stagingPath = path.join(__dirname, 'data', 'slides.json');
    if (fs.existsSync(stagingPath)) {
      const staging = JSON.parse(fs.readFileSync(stagingPath, 'utf8'));
      if (Array.isArray(staging) && staging.length > 0) {
        const placeholders = staging.map((_, i) => '(?, 1, ?)').join(', ');
        const values = staging.flatMap((f, i) => [f, i]);
        await pool.query(`INSERT INTO slides (filename, published, sort_order) VALUES ${placeholders}`, values);
        console.log(`  Copied ${staging.length} staging slides as live`);
      }
    }
  }

  // Seed messages
  console.log('Seeding messages...');
  await pool.query('DELETE FROM messages');
  const messagesPath = path.join(__dirname, 'data', 'messages.json');
  if (fs.existsSync(messagesPath)) {
    const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages) {
        await pool.query(
          'INSERT INTO messages (id, name, email, subject, message, is_read, created_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name',
          [m.id, m.name, m.email, m.subject || '', m.message, m.read ? 1 : 0, m.createdAt]
        );
      }
      console.log(`  Inserted ${messages.length} messages`);
    }
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
