const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskCheckList } = require("../controllers/taskController");

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // get all tasks (Admin: all, User: assigned) -> done
router.get("/:id", protect, getTaskById); // get task by ID -> done
router.post("/", protect, adminOnly, createTask); // create a task (Admin Only) -> done
router.put("/:id", protect, updateTask); // update task details -> done
router.delete("/:id", protect, adminOnly, deleteTask); // delete a task (Admin Only) -> done
router.put("/:id/status", protect, updateTaskStatus); // update task status
router.put("/:id/todo", protect, updateTaskCheckList); // update task checklist

module.exports = router;