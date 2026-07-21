const contentService = require('../services/contentService');

function getContent(req, res) {
  const content = contentService.readAll();
  res.json(content);
}

function saveContent(req, res) {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ ok: false, error: 'Invalid content payload' });
    }
    contentService.saveAll(content);
    res.json({ ok: true });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ ok: false, error: 'Failed to save content' });
  }
}

function streamEvents(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  res.write('event: connected\ndata: {}\n\n');

  const onUpdate = (content) => {
    res.write(`event: content-updated\ndata: ${JSON.stringify(content)}\n\n`);
  };

  contentService.emitter.on('content-updated', onUpdate);

  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  req.on('close', () => {
    contentService.emitter.off('content-updated', onUpdate);
    clearInterval(heartbeat);
  });
}

module.exports = { getContent, saveContent, streamEvents };
