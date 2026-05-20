const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc get all users (admin only)
// @route GET /api/users/:id
// @access private (Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role:'member' }).select('-password');

        // add task countes to each user
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
            const completedTask = await Task.countDocuments({ assignedTo: user._id, status: "completed"});

            return {
                ...user._doc, // Include all existing user data
                pendingTasks,
                inProgressTasks,
                completedTask
            };
        }));
        
        res.json(userWithTaskCounts);
    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc get user by id
// @route GET /api/users/:id
// @access private
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Delete a user (Admin only)
// @route DELETE /api/users/:id
// @access private (admin)
const deleteUser = async (req, res) => {
    try {

    } catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { getUsers, getUserById, deleteUser };