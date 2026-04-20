const express = require('express');
const router = express.Router();
const Message = require('../model/messageModel');

// @route   GET /api/messages
// @desc    Get all messages for the dashboard
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// @route   POST /api/messages
// @desc    Create a new message (from Contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please include all fields' });
    }
    const newMessage = await Message.create({ name, email, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete a message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message' });
  }
});

module.exports = router;