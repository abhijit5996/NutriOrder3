import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';

const OrderSuccessPage = () => {
  const { user } = useUser();
  const location = useLocation();
  const order = location.state?.order;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12">
      <div className="container-custom">
        <motion.div 
          className="max-w-3xl mx-auto card p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h1>
          
          <p className="text-gray-300 mb-6">
            Thank you for your order, {user?.firstName || 'valued customer'}! Your delicious food is on its way to you.
            We've sent a confirmation to your email with all the details.
          </p>
          
          <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Order Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Number:</span>
                <span className="font-medium text-white">{order?.orderNumber || Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Delivery:</span>
                <span className="font-medium text-white">30-45 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="font-medium text-white">{order?.paymentMethod === 'cod' ? 'Cash on Delivery' : order?.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount:</span>
                <span className="font-medium text-white">₹{order?.finalAmount?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn btn-primary px-6 py-3 text-lg font-semibold">
              Back to Home
            </Link>
            <Link to="/restaurants" className="btn btn-outline px-6 py-3 text-lg font-semibold">
              Order More Food
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
            <p className="text-gray-400 mb-4">
              If you have any questions about your order, please contact our customer support.
            </p>
            <div className="flex justify-center">
              <Link to="/contact" className="text-primary hover:text-primary/80 font-medium">
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;