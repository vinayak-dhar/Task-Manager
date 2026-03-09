const express = require("express");
const { route } = require("./authRoutes");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

// User Management Routes
router.get('/', protect, adminOnly, getUsers); // get all users (admin only)
router.get('/:id', protect, adminOnly, getUserById);
router.delete('/:id', protect, adminOnly, deleteUser); // delete user (admin only)

module.exports = router;