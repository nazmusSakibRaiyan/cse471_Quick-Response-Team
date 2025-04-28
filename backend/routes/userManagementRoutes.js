import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userManagementController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users (protected)
router.get("/", authMiddleware, getAllUsers);

// Delete user by ID (protected)
router.delete("/:id", authMiddleware, deleteUser);

export default router;
