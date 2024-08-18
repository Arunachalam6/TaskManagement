const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskcontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

// Task routes
router.route("/").post(protect, createTask).get(protect, getTasks);

router.route("/:id").put(protect, updateTask).put(protect, deleteTask);

module.exports = router;
