import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { endpoints, apiRequest } from '../config/api';

import CartItem from '../components/ui/CartItem';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeItem, clearCart, isLoading } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: user?.firstName || user?.lastName ? `${user.firstName} ${user.lastName}`.trim() : '',
    phone: user?.primaryPhoneNumber?.phoneNumber || '',
    address: '',
    deliveryInstructions: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity);
  };
  
  const handleRemoveItem = (id) => {
    removeItem(id);
  };
  
  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateDeliveryInfo = () => {
    const newErrors = {};
    
    if (!deliveryInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!deliveryInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(deliveryInfo.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!deliveryInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleProceedToDelivery = () => {
    // Check if user is logged in
    if (!user) {
      // Navigate to login with redirect back to cart
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    setCheckoutStep(1);
  };
  
  const handleProceedToPayment = () => {
    if (validateDeliveryInfo()) {
      setCheckoutStep(2);
    }
  };
  
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    
    try {
      // First check if user is logged in
      if (!user) {
        toast.error('Please login to place an order');
        navigate('/login');
        return;
      }

      // Validate cart has items
      if (!items.length) {
        toast.error('Your cart is empty');
        return;
      }

      // Validate delivery info
      if (!validateDeliveryInfo()) {
        toast.error('Please fill in all required delivery information');
        return;
      }

      const orderData = await apiRequest(endpoints.orders.create(user.id), {
        method: 'POST',
        body: JSON.stringify({
          deliveryInfo,
          paymentMethod,
        }),
        credentials: 'include',
      });
      
      await clearCart();  // Wait for cart to clear
      toast.success('Order placed successfully!');
      navigate('/order-success', { state: { order: orderData.order } });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing your order. Please check your internet connection and try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto card p-8 text-center">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (totalItems === 0 && checkoutStep === 0) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto card p-8 text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/restaurants" className="btn btn-primary px-6 py-3">
              Browse Restaurants
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Checkout Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div 
                  className={`h-2 ${checkoutStep >= 0 ? 'bg-primary' : 'bg-gray-700'} rounded-l-full`}
                ></div>
              </div>
              <div className="flex-1">
                <div 
                  className={`h-2 ${checkoutStep >= 1 ? 'bg-primary' : 'bg-gray-700'}`}
                ></div>
              </div>
              <div className="flex-1">
                <div 
                  className={`h-2 ${checkoutStep >= 2 ? 'bg-primary' : 'bg-gray-700'} rounded-r-full`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className={`text-sm font-medium ${checkoutStep >= 0 ? 'text-primary' : 'text-gray-500'}`}>Cart</div>
              <div className={`text-sm font-medium ${checkoutStep >= 1 ? 'text-primary' : 'text-gray-500'}`}>Delivery</div>
              <div className={`text-sm font-medium ${checkoutStep >= 2 ? 'text-primary' : 'text-gray-500'}`}>Payment</div>
            </div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {checkoutStep === 0 && (
                  <motion.div 
                    key="cart-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="card p-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Your Cart ({totalItems} items)</h2>
                    
                    <div className="divide-y divide-gray-800">
                      <AnimatePresence>
                        {items.map(item => (
                          <CartItem 
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Link to="/restaurants" className="text-primary hover:text-primary/80 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Continue Shopping
                      </Link>
                      
                      <button 
                        onClick={() => clearCart()}
                        className="text-red-400 hover:text-red-300 font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear Cart
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {checkoutStep === 1 && (
                  <motion.div 
                    key="delivery-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="card p-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Delivery Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-400 font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={deliveryInfo.name}
                          onChange={handleDeliveryInfoChange}
                          className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-400 font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={deliveryInfo.phone}
                          onChange={handleDeliveryInfoChange}
                          className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-gray-400 font-medium mb-2">
                          Delivery Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={deliveryInfo.address}
                          onChange={handleDeliveryInfoChange}
                          rows="3"
                          className={`input-field ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                          placeholder="Enter your delivery address"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="deliveryInstructions" className="block text-gray-400 font-medium mb-2">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          id="deliveryInstructions"
                          name="deliveryInstructions"
                          value={deliveryInfo.deliveryInstructions}
                          onChange={handleDeliveryInfoChange}
                          rows="2"
                          className="input-field"
                          placeholder="Any special instructions for delivery"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep(0)}
                        className="text-primary hover:text-primary/80 font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Cart
                      </button>
                      
                      <button 
                        onClick={handleProceedToPayment}
                        className="btn btn-primary px-6 py-2"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {checkoutStep === 2 && (
                  <motion.div 
                    key="payment-step"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="card p-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-colors duration-200 hover:border-primary">
                        <input 
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="h-5 w-5 text-primary focus:ring-primary"
                        />
                        <div className="ml-3">
                          <span className="block text-white font-medium">Cash on Delivery</span>
                          <span className="block text-gray-400 text-sm">Pay when your order arrives</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-colors duration-200 hover:border-primary">
                        <input 
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="h-5 w-5 text-primary focus:ring-primary"
                        />
                        <div className="ml-3">
                          <span className="block text-white font-medium">Credit/Debit Card</span>
                          <span className="block text-gray-400 text-sm">Pay securely with your card</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer transition-colors duration-200 hover:border-primary">
                        <input 
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="h-5 w-5 text-primary focus:ring-primary"
                        />
                        <div className="ml-3">
                          <span className="block text-white font-medium">UPI</span>
                          <span className="block text-gray-400 text-sm">Pay using UPI apps like Google Pay, PhonePe, etc.</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button 
                        onClick={() => setCheckoutStep(1)}
                        className="text-primary hover:text-primary/80 font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Delivery
                      </button>
                      
                      <button 
                        onClick={handlePlaceOrder}
                        className="btn btn-primary px-6 py-2"
                        disabled={isPlacingOrder}
                      >
                        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-80"
            >
              <div className="card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Fee</span>
                    <span>₹40.00</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-800 pt-3 flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span>₹{(totalAmount + 40 + totalAmount * 0.05).toFixed(2)}</span>
                  </div>
                </div>
                
                {checkoutStep === 0 && (
                  <button 
                    onClick={handleProceedToDelivery}
                    className="btn btn-primary w-full py-3"
                  >
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;