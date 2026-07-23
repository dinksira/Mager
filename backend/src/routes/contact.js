const express = require('express');
const router = express.Router();
const { getAll, addMessage, deleteMessage } = require('../services/contactService');

router.get('/', async (req, res) => {
  try {
    const messages = await getAll();
    const { unread } = req.query;
    if (unread === 'true') {
      return res.json(messages.filter(m => !m.read));
    }
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const entry = await addMessage({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message received', id: entry.id });
  } catch (err) {
    console.error('Add message error:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteMessage(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Delete message error:', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
