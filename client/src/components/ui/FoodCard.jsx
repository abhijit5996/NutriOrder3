import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const FoodCard = ({ food, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCartClick = () => {
    const itemToAdd = { ...food, quantity };
    addItem(itemToAdd);
    if (onAddToCart) {
      onAddToCart(itemToAdd);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-48 object-cover"
        />
        {food.isHealthy && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
          >
            Healthy Choice
          </motion.span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{food.name}</h3>
          <span className="text-primary font-bold">₹{food.price}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{food.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Quantity:</span>
            <div className="flex items-center border border-gray-700 rounded-md bg-[#252A36]">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                disabled={quantity <= 1}
              >
                -
              </motion.button>
              <span className="px-2 py-1 text-white">{quantity}</span>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
              >
                +
              </motion.button>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${i < Math.floor(food.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`} 
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-400 ml-1">({food.reviewCount || 0})</span>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4">
          <button 
            onClick={handleAddToCartClick}
            className="btn btn-primary btn-food-card"
          >
            Add to Cart
          </button>
          <button className="btn btn-outline btn-food-card">
            View Recipe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;