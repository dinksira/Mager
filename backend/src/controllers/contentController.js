const contentService = require('../services/contentService');

async function getContent(req, res) {
  try {
    const content = await contentService.readAll();
    res.json(content);
  } catch (err) {
    console.error('Get content error:', err);
    res.status(500).json({ ok: false, error: 'Failed to load content' });
  }
}

async function saveContent(req, res) {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ ok: false, error: 'Invalid content payload' });
    }
    const existing = await contentService.readAll();
    const merged = { ...existing, ...content };
    await contentService.saveAll(merged);
    res.json({ ok: true });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ ok: false, error: 'Failed to save content' });
  }
}

function streamEvents(req, res) {
  let destroyed = false;

  const safeWrite = (data) => {
    if (!destroyed) {
      try { res.write(data); } catch {}
    }
  };

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  safeWrite('event: connected\ndata: {}\n\n');

  const onUpdate = (content) => {
    safeWrite(`event: content-updated\ndata: ${JSON.stringify(content)}\n\n`);
  };

  contentService.emitter.on('content-updated', onUpdate);

  const heartbeat = setInterval(() => {
    safeWrite(': heartbeat\n\n');
  }, 15000);

  res.on('error', () => { destroyed = true; });

  req.on('close', () => {
    destroyed = true;
    contentService.emitter.off('content-updated', onUpdate);
    clearInterval(heartbeat);
  });
}

function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'No file uploaded' });
    }
    res.json({ ok: true, filename: req.file.filename });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ ok: false, error: 'Failed to upload' });
  }
}

module.exports = { getContent, saveContent, streamEvents, uploadImage };
