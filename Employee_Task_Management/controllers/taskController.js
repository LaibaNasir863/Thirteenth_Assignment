const taskModel = require("../models/taskModel");

// Allowed values
const priorities = ["Low", "Medium", "High"];

const statuses = ["Pending", "In Progress", "Completed"];

const allowedFields = [
  "title",
  "description",
  "assignedTo",
  "priority",
  "status",
  "dueDate",
];

// Validate task data
const validateTask = (data, isPartial = false) => {
  const errors = [];

  if (!isPartial) {
    allowedFields.forEach((field) => {
      if (
        data[field] === undefined ||
        data[field] === null ||
        (typeof data[field] === "string" && data[field].trim() === "")
      ) {
        errors.push(`${field} is required`);
      }
    });
  }

  if (
    data.title !== undefined &&
    (typeof data.title !== "string" || !data.title.trim())
  ) {
    errors.push("Title must be a non-empty string");
  }

  if (
    data.description !== undefined &&
    (typeof data.description !== "string" || !data.description.trim())
  ) {
    errors.push("Description must be a non-empty string");
  }

  if (
    data.assignedTo !== undefined &&
    (typeof data.assignedTo !== "string" || !data.assignedTo.trim())
  ) {
    errors.push("AssignedTo must be a non-empty string");
  }

  if (data.priority !== undefined && !priorities.includes(data.priority)) {
    errors.push("Priority must be Low, Medium, or High");
  }

  if (data.status !== undefined && !statuses.includes(data.status)) {
    errors.push("Status must be Pending, In Progress, or Completed");
  }

  if (data.dueDate !== undefined) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (typeof data.dueDate !== "string" || !datePattern.test(data.dueDate)) {
      errors.push("Due date must use YYYY-MM-DD format");
    } else {
      const date = new Date(`${data.dueDate}T00:00:00Z`);

      if (
        Number.isNaN(date.getTime()) ||
        date.toISOString().slice(0, 10) !== data.dueDate
      ) {
        errors.push("Due date must be a valid calendar date");
      }
    }
  }

  return errors;
};

// Check for unsupported fields
const checkUnknownFields = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["Request body must be a JSON object"];
  }

  return Object.keys(data).filter((field) => !allowedFields.includes(field));
};

// GET all tasks
const getAllTasks = (req, res, next) => {
  try {
    const tasks = taskModel.getAllTasks();

    res.status(200).json({
      success: true,
      message: "All tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// GET task by ID
const getTaskById = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = taskModel.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// POST create task
const createTask = (req, res, next) => {
  try {
    const unknownFields = checkUnknownFields(req.body);

    if (unknownFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: unknownFields,
      });
    }

    const errors = validateTask(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const taskData = {};

    allowedFields.forEach((field) => {
      taskData[field] = req.body[field].trim();
    });

    const newTask = taskModel.createTask(taskData);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

// PUT update complete task
const updateTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const unknownFields = checkUnknownFields(req.body);

    if (unknownFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: unknownFields,
      });
    }

    const errors = validateTask(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const taskData = {};

    allowedFields.forEach((field) => {
      taskData[field] = req.body[field].trim();
    });

    const updatedTask = taskModel.updateTask(id, taskData);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH update selected fields
const patchTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const unknownFields = checkUnknownFields(req.body);

    if (unknownFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: unknownFields,
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const errors = validateTask(req.body, true);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const taskData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        taskData[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];
      }
    });

    const updatedTask = taskModel.patchTask(id, taskData);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Selected task fields updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE task
const deleteTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const deletedTask = taskModel.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

// GET tasks by status
const getTasksByStatus = (req, res, next) => {
  try {
    const { status } = req.params;

    if (!statuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
        allowedValues: statuses,
      });
    }

    const tasks = taskModel.getTasksByStatus(status);

    res.status(200).json({
      success: true,
      message: "Tasks filtered by status successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// GET tasks by priority
const getTasksByPriority = (req, res, next) => {
  try {
    const { priority } = req.params;

    if (!priorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority",
        allowedValues: priorities,
      });
    }

    const tasks = taskModel.getTasksByPriority(priority);

    res.status(200).json({
      success: true,
      message: "Tasks filtered by priority successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// GET task summary
const getTaskSummary = (req, res, next) => {
  try {
    const summary = taskModel.getTaskSummary();

    res.status(200).json({
      success: true,
      message: "Task summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

// GET tasks by employee
const getTasksByEmployee = (req, res, next) => {
  try {
    const { name } = req.params;

    const tasks = taskModel.getTasksByEmployee(name.trim());

    res.status(200).json({
      success: true,
      message: "Employee tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// GET overdue tasks
const getOverdueTasks = (req, res, next) => {
  try {
    const tasks = taskModel.getOverdueTasks();

    res.status(200).json({
      success: true,
      message: "Overdue tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Export controllers
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
  getTasksByStatus,
  getTasksByPriority,
  getTaskSummary,
  getTasksByEmployee,
  getOverdueTasks,
};
