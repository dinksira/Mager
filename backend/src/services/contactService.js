const pool = require('./db');
const crypto = require('crypto');

async function getAll() {
  const [rows] = await pool.query('SELECT id, name, email, subject, message, is_read AS `read`, created_at AS createdAt FROM messages ORDER BY created_at DESC');
  return rows.map(r => ({ ...r, read: Boolean(r.read) }));
}

async function addMessage({ name, email, subject, message }) {
  const id = Date.now().toString(36) + crypto.randomBytes(3).toString('hex');
  await pool.query(
    'INSERT INTO messages (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)',
    [id, name, email, subject || '', message]
  );
  return { id, name, email, subject: subject || '', message, createdAt: new Date().toISOString(), read: false };
}

async function deleteMessage(id) {
  const [result] = await pool.query('DELETE FROM messages WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { getAll, addMessage, deleteMessage };
