import pool from './src/services/db.js';

async function check() {
  const [rows] = await pool.query('SELECT `key` FROM content ORDER BY `key`');
  console.log('=== Content keys (' + rows.length + ') ===');
  rows.forEach(r => console.log('  ' + r.key));

  const [s] = await pool.query('SELECT COUNT(*) AS cnt FROM slides WHERE published = 0');
  const [l] = await pool.query('SELECT COUNT(*) AS cnt FROM slides WHERE published = 1');
  console.log('\n=== Slides ===\n  Staging: ' + s[0].cnt + ', Live: ' + l[0].cnt);

  const [m] = await pool.query('SELECT COUNT(*) AS cnt FROM messages');
  console.log('\n=== Messages ===\n  Total: ' + m[0].cnt);
  process.exit(0);
}
check();
