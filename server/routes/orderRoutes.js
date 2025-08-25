import express from 'express';
import {
  createOrder,
  getOrderHistory,
  getOrderDetails
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/:clerkUserId', createOrder);

// Get user order history
router.get('/:clerkUserId', getOrderHistory);

// Get specific order details
router.get('/:clerkUserId/:orderId', getOrderDetails);

export default router;