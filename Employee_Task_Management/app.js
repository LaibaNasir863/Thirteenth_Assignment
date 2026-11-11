
const express = require("express");

const app = express();

const taskRoutes = require("./routes/taskRoutes");

const notFound = require("./middleware/notFound");

const errorHandler = require("./middleware/errorHandler");

// Parse JSON request bodies
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee Task Management API is running"
    });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Handle unknown routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
