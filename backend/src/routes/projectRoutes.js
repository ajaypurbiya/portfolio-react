const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getProjects, createProject, deleteProject, upload } = require('../controllers/projectController');

const router = express.Router();

router.route('/').get(protect, getProjects).post(protect, upload.single('image'), createProject);
router.route('/:id').delete(protect, deleteProject);

module.exports = router;
