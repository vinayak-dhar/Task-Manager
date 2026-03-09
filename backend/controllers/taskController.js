const Task = require("../models/Task");

// @desc get all tasks (admin: all, user: only assigned tasks)
// @route GET /api/tasks/
// @access private
const getTasks = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc get task by ID
// @route GET /api/tasks/:id
// @access private
const getTaskById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc create a new task (Admin Only)
// @route POST /api/tasks/
// @access private (Admin)
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoCheckList
        } = req.body;

        if (!Array.isArray(assignedTo)) {
            return res
                .status(400)
                .json({ message: "assignedTo must be an array of user IDs" });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            todoCheckList,
            attachments,
        });

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc update task details
// @route PUT /api/tasks/:id
// @access private
const updateTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc delete a task (Admin Only)
// @route DELETE /api/tasks/:id
// @access private (Admin)
const deleteTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc update task status
// @route PUT /api/tasks/:id/status
// @access private
const updateTaskStatus = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc update task checklist
// @route PUT /api/tasks/:id/todo
// @access private
const updateTaskCheckList = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Dashboard Data (Admin Only)
// @route GET /api/tasks/dashboard-data
// @access private
const getDashboardData = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Dashboard Data (User-specific)
// @route GET /api/tasks/user-dashboard-data
// @access private
const getUserDashboardData = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskCheckList,
    getDashboardData,
    getUserDashboardData
}