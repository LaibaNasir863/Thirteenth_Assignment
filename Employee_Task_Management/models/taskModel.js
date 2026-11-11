const tasks = require("../data/tasks");

const getAllTasks = () => {
    return tasks;
};

const getTaskById = (id) => {
    return tasks.find(task => task.id === Number(id));
};

let nextId = 1;

const createTask = (taskData) => {
    const newTask = {
        id: nextId++,
        ...taskData
    };

    tasks.push(newTask);

    return newTask;
};

const updateTask = (id, taskData) => {
    const task = getTaskById(id);

    if (!task) {
        return null;
    }

    Object.assign(task, taskData);

    return task;
};

const patchTask = (id, taskData) => {
    const task = getTaskById(id);

    if (!task) {
        return null;
    }

    Object.assign(task, taskData);

    return task;
};

const deleteTask = (id) => {
    const index = tasks.findIndex(
        task => task.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedTask = tasks.splice(index, 1);

    return deletedTask[0];
};

const getTasksByStatus = (status) => {
    return tasks.filter(
        task => task.status.toLowerCase() === status.toLowerCase()
    );
};

const getTasksByPriority = (priority) => {
    return tasks.filter(
        task => task.priority.toLowerCase() === priority.toLowerCase()
    );
};

const getTasksByEmployee = (name) => {
    return tasks.filter(
        task => task.assignedTo.toLowerCase() === name.toLowerCase()
    );
};

const getTaskSummary = () => {
    return {
        totalTasks: tasks.length,
        pending: tasks.filter(task => task.status === "Pending").length,
        inProgress: tasks.filter(task => task.status === "In Progress").length,
        completed: tasks.filter(task => task.status === "Completed").length
    };
};
const getOverdueTasks = () => {
    const today = new Date().toISOString().split("T")[0];

    return tasks.filter(task =>
        task.dueDate < today &&
        task.status !== "Completed"
    );
};
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    patchTask,
    deleteTask,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByEmployee,
    getTaskSummary,
    getOverdueTasks
};
