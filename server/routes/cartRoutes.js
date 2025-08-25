import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// Get user cart
router.get('/:clerkUserId', getCart);

// Add item to cart
router.post('/:clerkUserId', addToCart);

// Update cart item quantity
router.put('/:clerkUserId/item/:itemId', updateCartItem);

// Remove item from cart
router.delete('/:clerkUserId/item/:itemId', removeFromCart);

// Clear entire cart
router.delete('/:clerkUserId', clearCart);

export default router;