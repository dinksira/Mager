const fs = require('fs');
const path = require('path');
const pool = require('./services/db');
const { ensureDatabase } = require('./services/db');
const app = require('./app');

const PORT = process.env.PORT || 4000;

async function initDb() {
  await ensureDatabase();

  const schemaPath = path.join(__dirname, 'schema.sql');
  if (!fs.existsSync(schemaPath)) return;
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const statements = schema.split(';').filter(s => s.trim());
  for (const stmt of statements) {
    if (stmt.trim().toUpperCase().startsWith('CREATE TABLE')) {
      try { await pool.query(stmt); } catch (e) { console.error('Schema error:', e.message); }
    }
  }
}

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
