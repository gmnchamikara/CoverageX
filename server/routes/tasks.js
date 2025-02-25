const express = require("express");
const Task = require("../models/tasks"); // Sequelize model

const router = express.Router();

// Create (save) a task
router.post("/task/save", async (req, res) => {
  try {
    const newPost = await Task.create(req.body);
    return res.status(200).json({
      success: "Task saved successfully!",
      task: newPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "Failed to save!",
    });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully!",
      tasks,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

// Update a task
router.put("/task/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id },
    });
    if (updated) {
      return res.status(200).json({ success: "Task updated successfully!" });
    }
    return res.status(404).json({ message: "Task not found!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete("/task/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(200).json({
        message: "Task deleted successfully!",
      });
    }
    return res.status(404).json({
      message: "Task not found!",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "Delete unsuccessful!",
    });
  }
});

// Get a specific task by id
router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      return res.status(200).json({
        success: true,
        task,
      });
    }
    return res.status(404).json({
      message: "Task not found!",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
