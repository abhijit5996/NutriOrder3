import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { endpoints, apiRequest } from '../config/api';

const OrderHistoryPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (user) {
        try {
          setIsLoading(true);
          setError(null);
          
          const ordersData = await apiRequest(endpoints.orders.getHistory(user.id), {
            credentials: 'include',
          });
          
          setOrders(ordersData);
        } catch (err) {
          console.error('Error fetching order history:', err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrderHistory();
  }, [user]);

  // Filter orders based on status
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge class based on order status
  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'preparing':
        return 'bg-blue-500/20 text-blue-400';
      case 'on_the_way':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Format status text for display
  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
              <div className="h-10 bg-gray-700 rounded w-full mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-gray-700 rounded"></div>
                ))}
              </div>
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
          <div className="max-w-3xl mx-auto card p-8 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Orders</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Your Order History</h1>
                <p className="text-gray-400">
                  View all your past orders and their status
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Filter by:</span>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="on_the_way">On the Way</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {filteredOrders.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {filteredOrders.map((order) => (
                <div key={order._id} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg">Order #{order.orderNumber}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(order.status)}`}>
                        {formatStatus(order.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="text-gray-400 text-sm font-medium mb-2">Items</h4>
                      <ul className="space-y-1">
                        {order.items.slice(0, 3).map((item, index) => (
                          <li key={index} className="text-white text-sm">
                            {item.quantity} × {item.name}
                          </li>
                        ))}
                        {order.items.length > 3 && (
                          <li className="text-gray-400 text-sm">
                            +{order.items.length - 3} more items
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-gray-400 text-sm font-medium mb-2">Delivery Address</h4>
                      <p className="text-white text-sm">
                        {order.deliveryInfo.address}
                      </p>
                      {order.deliveryInfo.deliveryInstructions && (
                        <p className="text-gray-400 text-sm mt-1">
                          Instructions: {order.deliveryInfo.deliveryInstructions}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-gray-400 text-sm font-medium mb-2">Payment</h4>
                      <p className="text-white text-sm capitalize">
                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Subtotal:</span>
                          <span className="text-white">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Delivery Fee:</span>
                          <span className="text-white">₹{order.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Tax:</span>
                          <span className="text-white">₹{order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium mt-1 pt-1 border-t border-gray-700">
                          <span className="text-white">Total:</span>
                          <span className="text-white">₹{order.finalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                      Estimated delivery: {order.status === 'delivered' 
                        ? `Delivered on ${formatDate(order.updatedAt)}` 
                        : '30-45 minutes'}
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                    >
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8 text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No Orders Found</h3>
              <p className="text-gray-400 mb-6">
                {filterStatus === 'all' 
                  ? "You haven't placed any orders yet. Start exploring restaurants to place your first order!" 
                  : `You don't have any ${filterStatus.replace('_', ' ')} orders.`}
              </p>
              {filterStatus !== 'all' ? (
                <button 
                  onClick={() => setFilterStatus('all')}
                  className="btn btn-outline mr-3"
                >
                  View All Orders
                </button>
              ) : null}
              <Link to="/restaurants" className="btn btn-primary">
                Browse Restaurants
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;