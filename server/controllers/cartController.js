import Cart from '../models/cart.js';

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    
    if (!clerkUserId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    console.log('Fetching cart for user:', clerkUserId);
    let cart = await Cart.findOne({ clerkUserId });

    if (!cart) {
      console.log('Creating new cart for user:', clerkUserId);
      // Create empty cart if it doesn't exist
      cart = new Cart({
        clerkUserId,
        items: [],
        totalItems: 0,
        totalAmount: 0
      });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Server error while processing cart request', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const item = req.body;

    let cart = await Cart.findOne({ clerkUserId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({
        clerkUserId,
        items: [],
        totalItems: 0,
        totalAmount: 0
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      cart.items.push(item);
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { clerkUserId, itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ clerkUserId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update quantity
    const quantityDifference = quantity - cart.items[itemIndex].quantity;
    cart.items[itemIndex].quantity = quantity;

    // Recalculate totals
    cart.totalItems += quantityDifference;
    cart.totalAmount += (cart.items[itemIndex].price * quantityDifference);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { clerkUserId, itemId } = req.params;

    const cart = await Cart.findOne({ clerkUserId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove item and update totals
    const removedItem = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);
    cart.totalItems -= removedItem.quantity;
    cart.totalAmount -= (removedItem.price * removedItem.quantity);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const cart = await Cart.findOne({ clerkUserId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear cart items and reset totals
    cart.items = [];
    cart.totalItems = 0;
    cart.totalAmount = 0;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};