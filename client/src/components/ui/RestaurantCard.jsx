import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RestaurantCard = ({ restaurant }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover"
        />
        {restaurant.isHealthFocused && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
          >
            Health Focused
          </motion.span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{restaurant.name}</h3>
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-yellow-400" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium ml-1 text-white">{restaurant.rating}</span>
            <span className="text-xs text-gray-400 ml-1">({restaurant.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{restaurant.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{restaurant.deliveryTime} min</span>
          <span className="mx-2">•</span>
          <span>{restaurant.distance} km</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {restaurant.cuisines.map((cuisine, index) => (
            <motion.span 
              key={index} 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full"
            >
              {cuisine}
            </motion.span>
          ))}
        </div>
        
        {/* Updated Link to use restaurant ID */}
        <Link 
          to={`/restaurants/${restaurant.id}`}
          className="btn btn-primary w-full"
        >
          View Menu
        </Link>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;