const AppConstant = require("../common/appconstants");
const Task = require('../models/tasks');

// Create a new task
exports.createTask = async(req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: AppConstant.TASK_CREATED,
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      message: AppConstant.TASKS_FETCHED,
      data: tasks,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: AppConstant.TASK_NOT_FOUND });
    }

    if (task.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: AppConstant.NOT_AUTHORIZED });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();

    res.status(200).json({
      success: true,
      message: AppConstant.TASK_UPDATED,
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: AppConstant.TASK_NOT_FOUND });
    }

    if (task.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: AppConstant.NOT_AUTHORIZED });
    }

    task.status = 'Inactive';
    await task.save();

    res.status(200).json({
      success: true,
      message: AppConstant.TASK_DELETED,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
