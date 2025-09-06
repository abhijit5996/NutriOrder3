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

    // Validate required fields
    if (!item.id || !item.name || !item.price || !item.quantity) {
      return res.status(400).json({ 
        message: 'Missing required fields: id, name, price, and quantity are required' 
      });
    }

    // Ensure numeric values are valid
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity);

    if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 1) {
      return res.status(400).json({ 
        message: 'Invalid price or quantity values' 
      });
    }

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
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item with validated values
      cart.items.push({
        id: item.id,
        name: item.name,
        price: price,
        quantity: quantity,
        image: item.image || '',
        restaurantId: item.restaurantId || '',
        restaurantName: item.restaurantName || ''
      });
    }

    // Recalculate totals with proper validation
    cart.totalItems = cart.items.reduce((total, cartItem) => {
      const itemQuantity = parseInt(cartItem.quantity) || 0;
      return total + itemQuantity;
    }, 0);

    cart.totalAmount = cart.items.reduce((total, cartItem) => {
      const itemPrice = parseFloat(cartItem.price) || 0;
      const itemQuantity = parseInt(cartItem.quantity) || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);

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

    // Validate quantity
    const newQuantity = parseInt(quantity);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity value' });
    }

    const cart = await Cart.findOne({ clerkUserId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update quantity
    cart.items[itemIndex].quantity = newQuantity;

    // Recalculate totals properly
    cart.totalItems = cart.items.reduce((total, cartItem) => {
      const itemQuantity = parseInt(cartItem.quantity) || 0;
      return total + itemQuantity;
    }, 0);

    cart.totalAmount = cart.items.reduce((total, cartItem) => {
      const itemPrice = parseFloat(cartItem.price) || 0;
      const itemQuantity = parseInt(cartItem.quantity) || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);

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

    // Remove item
    cart.items.splice(itemIndex, 1);

    // Recalculate totals properly
    cart.totalItems = cart.items.reduce((total, cartItem) => {
      const itemQuantity = parseInt(cartItem.quantity) || 0;
      return total + itemQuantity;
    }, 0);

    cart.totalAmount = cart.items.reduce((total, cartItem) => {
      const itemPrice = parseFloat(cartItem.price) || 0;
      const itemQuantity = parseInt(cartItem.quantity) || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);

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