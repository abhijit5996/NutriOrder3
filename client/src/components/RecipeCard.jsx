import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const RecipeCard = ({ food, showRestaurant }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add quantity field if missing
    const itemToAdd = {
      ...food,
      quantity: 1 // Default quantity
    };
    
    addItem(itemToAdd);
    // Don't call onAddToCart to avoid duplicate calls
  };

  // Create a URL-friendly slug from the food name
  const createSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      <div className="cursor-pointer">
        <Link to={`/recipe/${createSlug(food.name)}`}>
          <div className="relative overflow-hidden">
            <img 
              src={food.image} 
              alt={food.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {food.isHealthy && (
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Healthy
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white text-lg line-clamp-1">{food.name}</h3>
              <span className="text-primary font-bold">₹{food.price}</span>
            </div>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{food.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-white text-sm">{food.rating}</span>
                <span className="text-gray-400 text-sm ml-1">({food.reviewCount})</span>
              </div>
              <span className="text-gray-400 text-sm">{food.restaurant}</span>
            </div>
          </div>
        </Link>
        
        <div className="p-4 pt-0">
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-2 text-sm"
            >
              Add to Cart
            </button>
            <Link 
              to={`/recipe/${createSlug(food.name)}`}
              className="btn btn-outline px-4 py-2 text-sm"
            >
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;