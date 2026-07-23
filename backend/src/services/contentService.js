const pool = require('./db');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

async function readAll() {
  const [rows] = await pool.query('SELECT `key`, `value` FROM content');
  const obj = {};
  for (const row of rows) {
    obj[row.key] = row.value;
  }
  return obj;
}

async function saveAll(content) {
  const entries = Object.entries(content);
  if (entries.length === 0) return;
  const placeholders = entries.map(() => '(?, ?)').join(', ');
  const values = entries.flatMap(([k, v]) => [k, String(v)]);
  await pool.query(
    `INSERT INTO content (\`key\`, \`value\`) VALUES ${placeholders} ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`)`,
    values
  );
  emitter.emit('content-updated', content);
}

module.exports = { readAll, saveAll, emitter };
