import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);
  
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    onRemove(item.id);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center py-4 border-b border-gray-800 last:border-b-0"
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-white">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-400">{item.restaurantName}</p>
          </div>
          <p className="text-base font-medium text-primary">₹{item.price}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-700 rounded-md bg-[#252A36]">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
              disabled={quantity <= 1}
            >
              -
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.span 
                key={quantity}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="px-2 py-1 text-white"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
            >
              +
            </motion.button>
          </div>
          
          <div className="flex items-center">
            <p className="text-base font-medium text-white mr-4">
              ₹{(item.price * quantity).toFixed(2)}
            </p>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="text-gray-400 hover:text-primary transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;