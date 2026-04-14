const express = require('express');
const router = express.Router();
const { getTasks, setTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Now, both GET and POST are protected!
router.route('/').get(protect, getTasks).post(protect, setTask);

module.exports = router;