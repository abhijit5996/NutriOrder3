import express from 'express';
import {
  savePreferences,
  getPreferences,
  checkPreferences
} from '../controllers/userController.js';

const router = express.Router();

// Save user preferences
router.post('/preferences', savePreferences);

// Get user preferences
router.get('/preferences/:clerkUserId', getPreferences);

// Check if user has completed preferences
router.get('/preferences/check/:clerkUserId', checkPreferences);

export default router;