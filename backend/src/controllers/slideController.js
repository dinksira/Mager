const path = require('path');
const fs = require('fs');
const slideService = require('../services/slideService');

async function getSlides(req, res) {
  try {
    const slides = await slideService.readStaging();
    res.json(slides);
  } catch (err) {
    console.error('Get slides error:', err);
    res.status(500).json({ ok: false, error: 'Failed to load slides' });
  }
}

async function getLiveSlides(req, res) {
  try {
    const slides = await slideService.readLive();
    res.json(slides);
  } catch (err) {
    console.error('Get live slides error:', err);
    res.status(500).json({ ok: false, error: 'Failed to load live slides' });
  }
}

async function publishSlides(req, res) {
  try {
    const slides = await slideService.publish();
    res.json({ ok: true, slides });
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).json({ ok: false, error: 'Failed to publish' });
  }
}

async function uploadSlides(req, res) {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ ok: false, error: 'No files uploaded' });
    }
    const slides = await slideService.readStaging();
    const added = files.map(f => f.filename);
    const updated = [...slides, ...added];
    await slideService.saveStaging(updated);
    res.json({ ok: true, slides: updated, added });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ ok: false, error: 'Failed to upload' });
  }
}

async function replaceSlide(req, res) {
  try {
    const { filename } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ ok: false, error: 'No file provided' });

    const [staging, live] = await Promise.all([slideService.readStaging(), slideService.readLive()]);
    const stagingIdx = staging.indexOf(filename);
    const liveIdx = live.indexOf(filename);

    if (stagingIdx === -1 && liveIdx === -1) {
      fs.unlinkSync(file.path);
      return res.status(404).json({ ok: false, error: 'Slide not found' });
    }

    const oldPath = path.join(slideService.UPLOADS_DIR, filename);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    if (stagingIdx !== -1) {
      staging[stagingIdx] = file.filename;
      await slideService.saveStaging(staging);
    }
    if (liveIdx !== -1) {
      live[liveIdx] = file.filename;
      await slideService.saveLive(live);
    }
    const merged = [...new Set([...staging, ...live])];
    res.json({ ok: true, slides: staging, replaced: { old: filename, new: file.filename } });
  } catch (err) {
    console.error('Replace error:', err);
    res.status(500).json({ ok: false, error: 'Failed to replace' });
  }
}

async function deleteSlide(req, res) {
  try {
    const { filename } = req.params;
    const [staging, live] = await Promise.all([slideService.readStaging(), slideService.readLive()]);
    const stagingFiltered = staging.filter(s => s !== filename);
    const liveFiltered = live.filter(s => s !== filename);
    if (stagingFiltered.length === staging.length && liveFiltered.length === live.length) {
      return res.status(404).json({ ok: false, error: 'Slide not found' });
    }
    const filePath = path.join(slideService.UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (stagingFiltered.length !== staging.length) {
      await slideService.saveStaging(stagingFiltered);
    }
    if (liveFiltered.length !== live.length) {
      await slideService.saveLive(liveFiltered);
    }
    const merged = [...new Set([...stagingFiltered, ...liveFiltered])];
    res.json({ ok: true, slides: stagingFiltered });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ ok: false, error: 'Failed to delete' });
  }
}

function streamSlideEvents(req, res) {
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

  const onUpdate = (slides) => {
    safeWrite(`event: slides-updated\ndata: ${JSON.stringify(slides)}\n\n`);
  };

  slideService.emitter.on('slides-updated', onUpdate);

  const heartbeat = setInterval(() => {
    safeWrite(': heartbeat\n\n');
  }, 15000);

  res.on('error', () => { destroyed = true; });

  req.on('close', () => {
    destroyed = true;
    slideService.emitter.off('slides-updated', onUpdate);
    clearInterval(heartbeat);
  });
}

module.exports = { getSlides, getLiveSlides, publishSlides, uploadSlides, replaceSlide, deleteSlide, streamSlideEvents };
