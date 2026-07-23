const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { getContent, saveContent, streamEvents, uploadImage } = require('../controllers/contentController');
const slideService = require('../services/slideService');

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

router.get('/', getContent);
router.get('/events', streamEvents);
router.post('/', saveContent);
router.post('/upload-image', upload.single('image'), uploadImage);

module.exports = router;
