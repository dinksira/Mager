const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const slideService = require('../services/slideService');
const { getSlides, getLiveSlides, publishSlides, uploadSlides, replaceSlide, deleteSlide, streamSlideEvents } = require('../controllers/slideController');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const { UPLOADS_DIR } = slideService;
    if (!require('fs').existsSync(UPLOADS_DIR)) {
      require('fs').mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .slice(0, 40);
    const timestamp = Date.now();
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

const router = Router();

router.get('/', getSlides);
router.get('/live', getLiveSlides);
router.get('/events', streamSlideEvents);
router.post('/publish', publishSlides);
router.post('/upload', upload.array('images', 20), uploadSlides);
router.post('/replace/:filename', upload.single('image'), replaceSlide);
router.delete('/:filename', deleteSlide);

module.exports = router;
