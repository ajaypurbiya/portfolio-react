const multer = require('multer');
const path = require('path');
const Project = require('../model/projectModel');
const User = require('../model/userModel');

// Helper async wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image file.'));
    }
  }
});

// @desc    Get all projects for authenticated user
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, techStack, link } = req.body;

  if (!title || !description || !techStack) {
    res.status(400);
    throw new Error('Please add title, description, and tech stack');
  }

  const image = req.file ? req.file.filename : null;

  const project = new Project({
    title,
    description,
    techStack: techStack.split(',').map(t => t.trim()),
    link: link || '',
    image,
    user: req.user._id
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await project.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  getProjects,
  createProject,
  deleteProject,
  upload
};
