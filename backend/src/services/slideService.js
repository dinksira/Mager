const pool = require('./db');
const path = require('path');
const fs = require('fs');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const SLIDES_LIVE_FILE = path.join(__dirname, '..', 'data', 'slides-live.json');

function ensureDirs() {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function readStaging() {
  const [rows] = await pool.query('SELECT filename FROM slides WHERE published = 0 ORDER BY sort_order ASC');
  return rows.map(r => r.filename);
}

async function saveStaging(filenames) {
  await pool.query('DELETE FROM slides WHERE published = 0');
  if (filenames.length > 0) {
    const placeholders = filenames.map((_, i) => '(?, 0, ?)').join(', ');
    const values = filenames.flatMap((f, i) => [f, i]);
    await pool.query(`INSERT INTO slides (filename, published, sort_order) VALUES ${placeholders}`, values);
  }
  emitter.emit('slides-updated', filenames);
}

async function readLive() {
  const [rows] = await pool.query('SELECT filename FROM slides WHERE published = 1 ORDER BY sort_order ASC');
  return rows.map(r => r.filename);
}

async function saveLive(filenames) {
  await pool.query('DELETE FROM slides WHERE published = 1');
  if (filenames.length > 0) {
    const placeholders = filenames.map((_, i) => '(?, 1, ?)').join(', ');
    const values = filenames.flatMap((f, i) => [f, i]);
    await pool.query(`INSERT INTO slides (filename, published, sort_order) VALUES ${placeholders}`, values);
  }
}

async function publish() {
  const staging = await readStaging();
  await pool.query('DELETE FROM slides WHERE published = 1');
  await pool.query('UPDATE slides SET published = 1 WHERE published = 0');
  emitter.emit('slides-updated', await readStaging());
  return staging;
}

module.exports = { readStaging, saveStaging, readLive, saveLive, publish, emitter, UPLOADS_DIR, SLIDES_LIVE_FILE };
