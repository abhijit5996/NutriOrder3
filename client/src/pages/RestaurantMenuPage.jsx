import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FoodCard from '../components/ui/FoodCard';
import { motion } from 'framer-motion';

const RestaurantMenuPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  
  // Get user preferences from Clerk user metadata
  const preferences = user?.unsafeMetadata?.preferences || {};
  
  useEffect(() => {
    const fetchRestaurantAndMenu = () => {
      setLoading(true);
      
      // Sample restaurant data
      const sampleRestaurants = [
        {
          id: 1,
          name: 'Green Leaf Bistro',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
          healthFocused: true,
          rating: 4.7,
          reviewCount: 328,
          location: 'Koramangala, Bangalore',
          deliveryTime: '25-35 min',
          distance: '1.2 km',
          cuisines: ['Healthy', 'Salads', 'Continental'],
          dietaryOptions: ['Vegan', 'Gluten-Free', 'Low-Carb'],
          description: 'A health-focused bistro offering nutritious and delicious meals made with fresh, locally-sourced ingredients.'
        },
        {
          id: 2,
          name: 'Spice Junction',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          healthFocused: false,
          rating: 4.5,
          reviewCount: 512,
          location: 'Indiranagar, Bangalore',
          deliveryTime: '30-40 min',
          distance: '2.5 km',
          cuisines: ['North Indian', 'Mughlai', 'Biryani'],
          dietaryOptions: ['Vegetarian'],
          description: 'Authentic North Indian cuisine with a focus on traditional recipes and rich, flavorful dishes.'
        }
      ];
      
      // Find the restaurant by ID from URL params
      const foundRestaurant = sampleRestaurants.find(r => r.id === parseInt(id));
      
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        // Sample menu items
        const sampleMenuItems = [
          {
            id: 101,
            restaurantId: 1,
            name: 'Quinoa Buddha Bowl',
            price: 280,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: 'Nutrient-rich quinoa with roasted vegetables, avocado, and tahini dressing.',
            category: 'Bowls',
            rating: 4.8,
            reviewCount: 124,
            dietaryInfo: ['Vegan', 'Gluten-Free', 'High-Protein'],
            nutritionalInfo: { calories: 420, protein: 15, carbs: 52, fat: 18 },
            spiceLevel: 'Mild',
            isRecommended: true
          },
          {
            id: 102,
            restaurantId: 1,
            name: 'Mediterranean Salad',
            price: 220,
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1384&q=80',
            description: 'Fresh greens with cherry tomatoes, cucumber, olives, feta cheese, and lemon vinaigrette.',
            category: 'Salads',
            rating: 4.6,
            reviewCount: 98,
            dietaryInfo: ['Vegetarian', 'Gluten-Free', 'Low-Carb'],
            nutritionalInfo: { calories: 320, protein: 12, carbs: 18, fat: 22 },
            spiceLevel: 'None',
            isRecommended: false
          },
          {
            id: 201,
            restaurantId: 2,
            name: 'Butter Chicken',
            price: 340,
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: 'Tender chicken pieces in a rich, creamy tomato-based curry.',
            category: 'Main Course',
            rating: 4.9,
            reviewCount: 186,
            dietaryInfo: ['High-Protein'],
            nutritionalInfo: { calories: 580, protein: 32, carbs: 14, fat: 42 },
            spiceLevel: 'Medium',
            isRecommended: true
          },
          {
            id: 202,
            restaurantId: 2,
            name: 'Paneer Tikka',
            price: 280,
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            description: 'Marinated cottage cheese cubes grilled in a tandoor.',
            category: 'Starters',
            rating: 4.7,
            reviewCount: 142,
            dietaryInfo: ['Vegetarian', 'High-Protein'],
            nutritionalInfo: { calories: 420, protein: 24, carbs: 12, fat: 30 },
            spiceLevel: 'Medium',
            isRecommended: true
          }
        ];
        
        // Filter menu items by restaurant ID
        const restaurantMenuItems = sampleMenuItems.filter(item => item.restaurantId === foundRestaurant.id);
        setMenuItems(restaurantMenuItems);
      }
      setLoading(false);
    };
    
    fetchRestaurantAndMenu();
  }, [id]);
  
  useEffect(() => {
    let baseItems = activeCategory === 'all' ? menuItems : menuItems.filter(item => item.category === activeCategory);
    
    if (preferences && Object.keys(preferences).length > 0) {
      let filtered = [...baseItems];
      
      // Apply dietary restrictions filter
      if (preferences.dietaryRestrictions?.length > 0) {
        filtered = filtered.filter(item => 
          preferences.dietaryRestrictions.every(restriction => 
            restriction === 'Vegetarian' ? 
            (item.dietaryInfo.includes('Vegetarian') || item.dietaryInfo.includes('Vegan')) : 
            item.dietaryInfo.includes(restriction)
          )
        );
      }
      
      // Apply spice level filter
      if (preferences.spiceLevel) {
        const spiceLevels = { 'None': 0, 'Mild': 1, 'Medium': 2, 'Hot': 3, 'Very Hot': 4 };
        const userSpiceLevel = spiceLevels[preferences.spiceLevel] || 0;
        filtered = filtered.filter(item => (spiceLevels[item.spiceLevel] || 0) <= userSpiceLevel);
      }
      
      // Apply medical conditions filter
      if (preferences.medicalConditions?.length > 0) {
        filtered = filtered.filter(item => {
          if (preferences.medicalConditions.includes('Diabetes')) 
            return item.dietaryInfo.includes('Low-Carb') || (item.nutritionalInfo && item.nutritionalInfo.carbs < 30);
          if (preferences.medicalConditions.includes('Heart Disease')) 
            return item.dietaryInfo.includes('Low-Fat') || (item.nutritionalInfo && item.nutritionalInfo.fat < 15);
          return true;
        });
      }
      
      setFilteredItems(filtered);
    } else {
      setFilteredItems(baseItems);
    }
  }, [preferences, menuItems, activeCategory]);

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="card p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Restaurant Not Found</h2>
            <p>The restaurant you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
            <div className="h-64 w-full bg-black">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 text-gray-200">
                  <span className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-yellow-400 mr-1" 
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {restaurant.rating} ({restaurant.reviewCount} reviews)
                  </span>
                  <span className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {restaurant.location}
                  </span>
                  <span className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {restaurant.deliveryTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3 mt-3">
                  {restaurant.cuisines.map((cuisine, index) => (
                    <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {cuisine}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 max-w-2xl">{restaurant.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-[#2c303a] text-gray-300 hover:bg-primary/50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {filteredItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.1 } 
              }
            }}
          >
            {filteredItems.map(item => (
              <motion.div 
                key={item.id} 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <FoodCard food={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="card p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">No Menu Items Found</h3>
            <p className="text-gray-400 mb-4">
              {activeCategory !== 'all' 
                ? `No items found in the "${activeCategory}" category.` 
                : 'No items match your dietary preferences.'
              }
            </p>
            {activeCategory !== 'all' && (
              <button 
                onClick={() => handleCategoryFilter('all')} 
                className="btn btn-primary px-6 py-2"
              >
                View All Items
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;