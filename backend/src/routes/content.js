const { Router } = require('express');
const { getContent, saveContent, streamEvents } = require('../controllers/contentController');

const router = Router();

router.get('/', getContent);
router.get('/events', streamEvents);
router.post('/', saveContent);

module.exports = router;
