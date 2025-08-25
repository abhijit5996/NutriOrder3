import Order from '../models/Order.js';
import Cart from '../models/cart.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const { deliveryInfo, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ clerkUserId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate tax and final amount
    const tax = cart.totalAmount * 0.05; // 5% tax
    const deliveryFee = 40; // Fixed delivery fee
    const finalAmount = cart.totalAmount + tax + deliveryFee;

    // Create order
    const order = new Order({
      clerkUserId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      tax,
      deliveryFee,
      finalAmount,
      deliveryInfo,
      paymentMethod
    });

    await order.save();

    // Clear the cart after successful order
    cart.items = [];
    cart.totalItems = 0;
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({ 
      message: 'Order created successfully', 
      order 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user order history
export const getOrderHistory = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const orders = await Order.find({ clerkUserId })
      .sort({ createdAt: -1 }) // Most recent first
      .select('-items') // Exclude items for list view
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting order history:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get specific order details
export const getOrderDetails = async (req, res) => {
  try {
    const { clerkUserId, orderId } = req.params;

    const order = await Order.findOne({ 
      _id: orderId, 
      clerkUserId 
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};