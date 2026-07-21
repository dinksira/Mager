const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');
const emitter = new EventEmitter();
emitter.setMaxListeners(100);

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readAll() {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) return {};
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveAll(content) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), 'utf-8');
  emitter.emit('content-updated', content);
}

module.exports = { readAll, saveAll, emitter };
