const Task = require('../model/taskModel');

 // @route   GET /api/tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
};

// @route   POST /api/tasks
const setTask = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: 'Please add a title and description' });
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });

  res.status(201).json(task);
};

module.exports = {
  getTasks,
  setTask,
};