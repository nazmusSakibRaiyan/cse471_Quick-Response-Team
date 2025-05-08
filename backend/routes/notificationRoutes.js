import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllAsRead,
  updateSOSReadStatus
} from '../controllers/notificationController.js';

const router = express.Router();

// Protect all notification routes with authentication
router.use(authMiddleware);

// Notification routes
router.get('/', getUserNotifications);
router.put('/read/:notificationId', markNotificationAsRead);
router.put('/read-all', markAllAsRead);
router.put('/sos-read/:sosId', updateSOSReadStatus);

export default router;