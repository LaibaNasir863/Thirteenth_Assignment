
const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

// ==================================
// SPECIFIC ROUTES FIRST
// ==================================

// GET task summary
router.get("/summary", taskController.getTaskSummary);

// GET overdue tasks
router.get("/overdue", taskController.getOverdueTasks);

// GET tasks by employee name
router.get("/employee/:name", taskController.getTasksByEmployee);

// GET tasks by status
router.get("/status/:status", taskController.getTasksByStatus);

// GET tasks by priority
router.get("/priority/:priority", taskController.getTasksByPriority);

// ==================================
// GENERAL TASK ROUTES
// ==================================

// GET all tasks
router.get("/", taskController.getAllTasks);

// GET task by ID
router.get("/:id", taskController.getTaskById);

// POST create new task
router.post("/", taskController.createTask);

// PUT update complete task
router.put("/:id", taskController.updateTask);

// PATCH update selected fields
router.patch("/:id", taskController.patchTask);

// DELETE task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
