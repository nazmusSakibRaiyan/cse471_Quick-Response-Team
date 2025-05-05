import express from "express";
import { getAllSOS, deleteSOS } from "../controllers/sosAdminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all SOS cases (admin access)
router.get("/", authMiddleware, getAllSOS);

// Delete an SOS case by ID (admin access)
router.delete("/:id", authMiddleware, deleteSOS);

export default router;
