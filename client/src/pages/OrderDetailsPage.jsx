import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { apiRequest, endpoints } from '../config/api';
import { generateInvoice } from '../utils/invoiceGenerator';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user || !orderId) return;

      try {
        setIsLoading(true);
        const orderData = await apiRequest(endpoints.orders.getDetails(user.id, orderId));
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user, orderId]);

  // Function to handle invoice download
  const handleDownloadInvoice = () => {
    console.log('Download invoice button clicked');
    
    if (!order) {
      console.error('No order data available');
      return;
    }
    
    console.log('Order data:', order);
    
    // Format the order data to match the expected structure for invoice generation
    const invoiceData = {
      id: order.id || order.orderNumber,
      date: order.createdAt,
      customer: {
        name: order.deliveryInfo.name,
        phone: order.deliveryInfo.phone,
        address: order.deliveryInfo.address,
      },
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      // Corrected field mapping with fallback values
      subtotal: order.totalAmount || 0,
      tax: order.tax || 0,
      deliveryFee: order.deliveryFee || 0,
      total: order.finalAmount || 0,
    };
    
    console.log('Invoice data:', invoiceData);
    
    generateInvoice(invoiceData);
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
              <div className="h-64 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Error Loading Order</h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <button 
                onClick={() => navigate('/profile')}
                className="btn btn-primary"
              >
                Back to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Order Not Found</h2>
              <p className="text-gray-400 mb-4">The order you're looking for doesn't exist or you don't have permission to view it.</p>
              <button 
                onClick={() => navigate('/profile')}
                className="btn btn-primary"
              >
                Back to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      case 'preparing':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'out_for_delivery':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatStatus = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-start mb-4">
              <button 
                onClick={() => navigate('/profile')}
                className="text-primary hover:text-primary/80 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Profile
              </button>
              
              {/* Download Invoice Button */}
              <button 
                onClick={handleDownloadInvoice}
                className="btn btn-primary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Invoice
              </button>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Order Details</h1>
            <p className="text-gray-400">Order #{order.orderNumber}</p>
          </motion.div>

          {/* Order Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 mb-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Order Status</h2>
                <p className="text-gray-400">
                  Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {formatStatus(order.status)}
              </span>
            </div>
            
            {order.estimatedDeliveryTime && (
              <p className="text-gray-300">
                Estimated delivery: {new Date(order.estimatedDeliveryTime).toLocaleString()}
              </p>
            )}
          </motion.div>

          {/* Order Items */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-gray-400 text-sm">₹{item.price} each</p>
                      {item.restaurantName && (
                        <p className="text-gray-500 text-sm">{item.restaurantName}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">Qty: {item.quantity}</p>
                    <p className="text-primary font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Delivery Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Delivery Information</h2>
            <div className="space-y-2">
              <p className="text-white"><span className="text-gray-400">Name:</span> {order.deliveryInfo.name}</p>
              <p className="text-white"><span className="text-gray-400">Phone:</span> {order.deliveryInfo.phone}</p>
              <p className="text-white"><span className="text-gray-400">Address:</span> {order.deliveryInfo.address}</p>
              {order.deliveryInfo.landmark && (
                <p className="text-white"><span className="text-gray-400">Landmark:</span> {order.deliveryInfo.landmark}</p>
              )}
            </div>
          </motion.div>

          {/* Payment & Bill Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Payment & Bill Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (5%)</span>
                <span className="text-white">₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Delivery Fee</span>
                <span className="text-white">₹{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-white">Total Amount</span>
                  <span className="text-lg font-semibold text-primary">₹{order.finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400">Payment Method: 
                <span className="text-white ml-2">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                   order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;