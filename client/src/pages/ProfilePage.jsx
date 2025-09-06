import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('preferences');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setIsLoading(true);
          
          // Fetch preferences
          const preferencesResponse = await fetch(`http://localhost:5000/api/user/preferences/${user.id}`);
          if (preferencesResponse.ok) {
            const preferencesData = await preferencesResponse.json();
            setPreferences(preferencesData.preferences);
          }
          
          // Fetch order history
          const ordersResponse = await fetch(`http://localhost:5000/api/orders/${user.id}`);
          if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            setOrders(ordersData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

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

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
            <p className="text-gray-400">
              Manage your preferences and view your order history
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex border-b border-gray-700">
              <button
                className={`py-3 px-6 font-medium transition-colors duration-200 ${
                  activeTab === 'preferences'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </button>
              <button
                className={`py-3 px-6 font-medium transition-colors duration-200 ${
                  activeTab === 'orders'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                Order History
              </button>
            </div>
          </motion.div>

          {/* Content */}
          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Food Preferences</h2>
              
              {preferences ? (
                <div className="space-y-6">
                  {/* Dietary Restrictions */}
                  {preferences.dietaryRestrictions && preferences.dietaryRestrictions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Dietary Restrictions</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.dietaryRestrictions.map(restriction => (
                          <span key={restriction} className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">
                            {restriction}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cuisine Preferences */}
                  {preferences.cuisinePreferences && preferences.cuisinePreferences.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Cuisine Preferences</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.cuisinePreferences.map(cuisine => (
                          <span key={cuisine} className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Health Conscious */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Health Conscious</h3>
                    <p className="text-gray-300">
                      {preferences.healthConscious ? 'Yes' : 'No'}
                    </p>
                  </div>

                  {/* Allergies */}
                  {preferences.allergies && preferences.allergies.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Food Allergies</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.allergies.map(allergy => (
                          <span key={allergy} className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Medical Conditions */}
                  {preferences.medicalConditions && preferences.medicalConditions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Medical Conditions</h3>
                      <div className="flex flex-wrap gap-2">
                        {preferences.medicalConditions.map(condition => (
                          <span key={condition} className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Spice Level */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Preferred Spice Level</h3>
                    <p className="text-gray-300 capitalize">
                      {preferences.spiceLevel}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">No Preferences Set</h3>
                  <p className="text-gray-400 mb-4">
                    You haven't set any food preferences yet. Set your preferences to get personalized recommendations.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/preferences'}
                    className="btn btn-primary"
                  >
                    Set Preferences
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Your Order History</h2>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-white">Order #{order.orderNumber}</h3>
                          <p className="text-gray-400 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-500/20 text-green-400' 
                            : order.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-gray-400 text-sm">Items</p>
                          <p className="text-white">{order.items.reduce((total, item) => total + item.quantity, 0)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Amount</p>
                          <p className="text-white">₹{order.finalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                          {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                           order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
                        </span>
                        <button 
                          onClick={() => navigate(`/order/${order._id}`)}
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
                  <p className="text-gray-400 mb-4">
                    You haven't placed any orders yet. Start exploring restaurants to place your first order!
                  </p>
                  <button 
                    onClick={() => window.location.href = '/restaurants'}
                    className="btn btn-primary"
                  >
                    Browse Restaurants
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;