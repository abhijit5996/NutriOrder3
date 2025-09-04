import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import RestaurantCard from '../components/ui/RestaurantCard';
import { motion, AnimatePresence } from 'framer-motion';

const RestaurantsPage = () => {
  const { user } = useUser();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    healthFocused: false,
    rating: 0,
    dietaryOptions: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Get user preferences from Clerk user metadata
  const preferences = user?.unsafeMetadata?.preferences || {};
  
  // Sample restaurant data
  useEffect(() => {
    // In a real app, this would be fetched from an API
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
      },
      {
        id: 3,
        name: 'Coastal Delights',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        healthFocused: false,
        rating: 4.3,
        reviewCount: 287,
        location: 'Whitefield, Bangalore',
        deliveryTime: '35-45 min',
        distance: '3.8 km',
        cuisines: ['South Indian', 'Seafood', 'Coastal'],
        dietaryOptions: ['Vegetarian', 'Non-Vegetarian'],
      },
      {
        id: 4,
        name: 'Fitness Bowl',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        healthFocused: true,
        rating: 4.6,
        reviewCount: 198,
        location: 'HSR Layout, Bangalore',
        deliveryTime: '20-30 min',
        distance: '1.5 km',
        cuisines: ['Healthy', 'Bowls', 'Smoothies'],
        dietaryOptions: ['Vegan', 'Gluten-Free', 'Keto', 'High-Protein'],
      },
      {
        id: 5,
        name: 'Tandoori Nights',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        healthFocused: false,
        rating: 4.4,
        reviewCount: 356,
        location: 'Jayanagar, Bangalore',
        deliveryTime: '30-45 min',
        distance: '4.2 km',
        cuisines: ['North Indian', 'Kebabs', 'Curry'],
        dietaryOptions: ['Vegetarian', 'Non-Vegetarian'],
      },
      {
        id: 6,
        name: 'Diabetic Delights',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        healthFocused: true,
        rating: 4.5,
        reviewCount: 127,
        location: 'JP Nagar, Bangalore',
        deliveryTime: '25-35 min',
        distance: '2.8 km',
        cuisines: ['Healthy', 'Diabetic-Friendly', 'Low-Sugar'],
        dietaryOptions: ['Diabetic-Friendly', 'Low-Carb', 'Sugar-Free'],
      },
    ];
    
    setRestaurants(sampleRestaurants);
    setFilteredRestaurants(sampleRestaurants);
    
    // Apply user preferences as initial filters if available
    if (preferences && Object.keys(preferences).length > 0) {
      const userFilters = {
        ...filters,
        dietaryOptions: preferences.dietaryRestrictions || [],
        healthFocused: preferences.healthConscious || false,
      };
      setFilters(userFilters);
      applyFilters(sampleRestaurants, userFilters);
    }
  }, [user]);
  
  const applyFilters = (restaurantList, currentFilters) => {
    let filtered = [...restaurantList];
    
    // Apply search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchTerm)) ||
        restaurant.location.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply cuisine filter
    if (currentFilters.cuisine) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase() === currentFilters.cuisine.toLowerCase()
        )
      );
    }
    
    // Apply health-focused filter
    if (currentFilters.healthFocused) {
      filtered = filtered.filter(restaurant => restaurant.healthFocused);
    }
    
    // Apply rating filter
    if (currentFilters.rating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= currentFilters.rating);
    }
    
    // Apply dietary options filter
    if (currentFilters.dietaryOptions.length > 0) {
      filtered = filtered.filter(restaurant => 
        currentFilters.dietaryOptions.every(option => 
          restaurant.dietaryOptions.includes(option)
        )
      );
    }
    
    setFilteredRestaurants(filtered);
  };
  
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'rating') {
      newValue = parseFloat(value);
    } else {
      newValue = value;
    }
    
    const updatedFilters = { ...filters, [name]: newValue };
    setFilters(updatedFilters);
    applyFilters(restaurants, updatedFilters);
  };
  
  const handleDietaryOptionChange = (option) => {
    let updatedOptions;
    if (filters.dietaryOptions.includes(option)) {
      updatedOptions = filters.dietaryOptions.filter(item => item !== option);
    } else {
      updatedOptions = [...filters.dietaryOptions, option];
    }
    
    const updatedFilters = { ...filters, dietaryOptions: updatedOptions };
    setFilters(updatedFilters);
    applyFilters(restaurants, updatedFilters);
  };
  
  const clearFilters = () => {
    const resetFilters = {
      search: '',
      cuisine: '',
      healthFocused: false,
      rating: 0,
      dietaryOptions: [],
    };
    setFilters(resetFilters);
    setFilteredRestaurants(restaurants);
  };
  
  // Get unique cuisines from all restaurants
  const allCuisines = [...new Set(restaurants.flatMap(restaurant => restaurant.cuisines))];
  
  // Get unique dietary options from all restaurants
  const allDietaryOptions = [...new Set(restaurants.flatMap(restaurant => restaurant.dietaryOptions))];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Discover Restaurants</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect restaurant that matches your taste and dietary preferences.
            {preferences && preferences.dietaryRestrictions?.length > 0 && (
              <span> We've applied your dietary preferences to help you find suitable options.</span>
            )}
          </p>
        </motion.div>
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-72 card p-6 h-fit lg:sticky top-24 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary/80"
              >
                Clear All
              </button>
            </div>
            
            {/* Search Filter */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-gray-400 font-medium mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Restaurant or cuisine..."
                className="input-field"
              />
            </div>
            
            {/* Cuisine Filter */}
            <div className="mb-6">
              <label htmlFor="cuisine" className="block text-gray-400 font-medium mb-2">
                Cuisine
              </label>
              <select
                id="cuisine"
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">All Cuisines</option>
                {allCuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            
            {/* Health-Focused Filter */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="healthFocused"
                  checked={filters.healthFocused}
                  onChange={handleFilterChange}
                  className="h-5 w-5 text-primary focus:ring-primary rounded"
                />
                <span className="ml-2 text-gray-400">Health-Focused Restaurants</span>
              </label>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <label htmlFor="rating" className="block text-gray-400 font-medium mb-2">
                Minimum Rating: {filters.rating > 0 ? filters.rating : 'Any'}
              </label>
              <input
                type="range"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Any</span>
                <span>5 ★</span>
              </div>
            </div>
            
            {/* Dietary Options Filter */}
            <div>
              <h4 className="text-gray-400 font-medium mb-2">Dietary Options</h4>
              <div className="space-y-2">
                {allDietaryOptions.map((option, index) => (
                  <label key={index} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.dietaryOptions.includes(option)}
                      onChange={() => handleDietaryOptionChange(option)}
                      className="h-5 w-5 text-primary focus:ring-primary rounded"
                    />
                    <span className="ml-2 text-gray-400">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Restaurant List */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredRestaurants.length > 0 ? (
                <motion.div 
                  key="has-results"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredRestaurants.map(restaurant => (
                    <motion.div key={restaurant.id} variants={itemVariants}>
                      <RestaurantCard restaurant={restaurant} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card p-8 text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">No Restaurants Found</h3>
                  <p className="text-gray-400 mb-4">
                    We couldn't find any restaurants matching your filters. Try adjusting your search criteria.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="btn btn-primary px-6 py-2"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;