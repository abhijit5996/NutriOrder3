import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import RestaurantCard from '../components/ui/RestaurantCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { user } = useUser();
  const preferences = null;
  
  const { addItem } = useCart();
  
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Sample data
      const sampleFoods = [
        {
          id: 1,
          name: 'Paneer Butter Masala',
          description: 'Creamy and rich paneer curry with tomatoes, butter, and spices.',
          price: 250,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.5,
          reviewCount: 128,
          isHealthy: true,
          restaurant: 'Spice Garden',
          restaurantId: 1,
        },
        {
          id: 2,
          name: 'Masala Dosa',
          description: 'Crispy rice crepe with spiced potato filling, served with sambar.',
          price: 150,
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.7,
          reviewCount: 156,
          isHealthy: true,
          restaurant: 'South Indian Delights',
          restaurantId: 2,
        },
        {
          id: 3,
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice with tender chicken and aromatic spices.',
          price: 280,
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.6,
          reviewCount: 210,
          isHealthy: false,
          restaurant: 'Biryani House',
          restaurantId: 3,
        },
        {
          id: 4,
          name: 'Vegetable Salad Bowl',
          description: 'Fresh mixed vegetables with a light dressing, for the health-conscious.',
          price: 180,
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.3,
          reviewCount: 89,
          isHealthy: true,
          restaurant: 'Green Plate',
          restaurantId: 4,
        },
        {
          id: 5,
          name: 'Margherita Pizza',
          description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
          price: 350,
          image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.8,
          reviewCount: 340,
          isHealthy: false,
          restaurant: 'Italiano Pizza',
          restaurantId: 5,
        },
        {
          id: 6,
          name: 'Quinoa Salad',
          description: 'Healthy and nutritious salad with quinoa, veggies, and lemon dressing.',
          price: 220,
          image: 'https://images.unsplash.com/photo-1551248429-40974aa41727?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.9,
          reviewCount: 150,
          isHealthy: true,
          restaurant: 'Green Plate',
          restaurantId: 4,
        },
        {
          id: 7,
          name: 'Sushi Platter',
          description: 'Assortment of fresh sushi rolls including salmon, tuna, and avocado.',
          price: 550,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.7,
          reviewCount: 195,
          isHealthy: true,
          restaurant: 'Tokyo Bites',
          restaurantId: 6,
        },
        {
          id: 8,
          name: 'Chilli Chicken',
          description: 'Spicy and tangy chicken stir-fried with bell peppers and onions.',
          price: 290,
          image: 'https://images.unsplash.com/photo-1599494102234-28a3f4e2427e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.4,
          reviewCount: 178,
          isHealthy: false,
          restaurant: 'Wok Hei',
          restaurantId: 7,
        }
      ];
      
      const sampleRestaurants = [
        {
          id: 1,
          name: 'Spice Garden',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.5,
          reviewCount: 328,
          location: 'Connaught Place, New Delhi',
          cuisines: ['North Indian', 'Mughlai', 'Chinese'],
          isHealthFocused: false,
          deliveryTime: 30,
          distance: 2.5,
        },
        {
          id: 2,
          name: 'South Indian Delights',
          image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.7,
          reviewCount: 256,
          location: 'Malviya Nagar, New Delhi',
          cuisines: ['South Indian', 'Dosa', 'Idli'],
          isHealthFocused: true,
          deliveryTime: 25,
          distance: 1.8,
        },
        {
          id: 3,
          name: 'Biryani House',
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.6,
          reviewCount: 410,
          location: 'Lajpat Nagar, New Delhi',
          cuisines: ['Biryani', 'Mughlai', 'North Indian'],
          isHealthFocused: false,
          deliveryTime: 35,
          distance: 3.2,
        },
        {
          id: 4,
          name: 'Green Plate',
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.3,
          reviewCount: 189,
          location: 'Vasant Kunj, New Delhi',
          cuisines: ['Healthy', 'Salads', 'Continental'],
          isHealthFocused: true,
          deliveryTime: 20,
          distance: 1.5,
        },
        {
          id: 5,
          name: 'Italiano Pizza',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.8,
          reviewCount: 520,
          location: 'Gurugram, Haryana',
          cuisines: ['Pizza', 'Italian', 'Fast Food'],
          isHealthFocused: false,
          deliveryTime: 40,
          distance: 5.5,
        },
        {
          id: 6,
          name: 'Tokyo Bites',
          image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.7,
          reviewCount: 310,
          location: 'Saket, New Delhi',
          cuisines: ['Japanese', 'Sushi', 'Asian'],
          isHealthFocused: true,
          deliveryTime: 35,
          distance: 4.1,
        },
        {
          id: 7,
          name: 'Wok Hei',
          image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          rating: 4.4,
          reviewCount: 280,
          location: 'Cyber Hub, Gurugram',
          cuisines: ['Chinese', 'Thai', 'Asian'],
          isHealthFocused: false,
          deliveryTime: 30,
          distance: 6.2,
        }
      ];
      
      if (preferences) {
        const filteredFoods = sampleFoods.filter(food => {
          if (preferences.dietaryRestrictions && preferences.dietaryRestrictions.includes('Vegetarian') && food.name.toLowerCase().includes('chicken')) {
            return false;
          }
          return true;
        });
        
        if (preferences.healthConscious) {
          filteredFoods.sort((a, b) => (b.isHealthy ? 1 : 0) - (a.isHealthy ? 1 : 0));
        }
        
        setFeaturedFoods(filteredFoods);
        
        const filteredRestaurants = sampleRestaurants.filter(restaurant => {
          return restaurant.cuisines.some(cuisine => 
            preferences.cuisinePreferences && preferences.cuisinePreferences.includes(cuisine)
          );
        });
        
        setRecommendedRestaurants(
          filteredRestaurants.length > 0 ? filteredRestaurants : sampleRestaurants
        );
      } else {
        setFeaturedFoods(sampleFoods);
        setRecommendedRestaurants(sampleRestaurants);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [preferences]);
  
  const handleAddToCart = (item) => {
    addItem(item);
    toast.success(`${item.name} added to the cart successfully!`);
  };
  
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
    <div className="py-8">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 to-[#F43F5E]/20 z-0"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F1F5F9]">
              Personalized Food Ordering for Your <span className="bg-gradient-to-r from-[#38BDF8] to-[#F43F5E] bg-clip-text text-transparent">Health & Taste</span>
            </h1>
            <p className="text-xl mb-8 text-[#94A3B8]">Order food that matches your preferences and dietary needs from the best restaurants.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/restaurants" className="btn btn-primary px-6 py-3 text-lg font-semibold">
                Browse Restaurants
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-outline px-6 py-3 text-lg font-semibold">
                  Sign Up for Personalized Recommendations
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Foods Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[#F1F5F9]"
            >
              {preferences ? 'Recommended for You' : 'Featured Foods'}
            </motion.h2>
            <Link to="/foods" className="text-[#38BDF8] hover:text-[#38BDF8]/80 font-medium">
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38BDF8]"></div>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredFoods.map(food => (
                <motion.div key={food.id} variants={itemVariants}>
                  <RecipeCard 
                    food={food} 
                    onAddToCart={handleAddToCart} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="section-padding bg-[#1E293B]">
        <div className="container-custom">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-[#F1F5F9] text-center mb-12"
          >
            How ZestyLife Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-6 text-center"
            >
              <div className="bg-[#38BDF8]/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#38BDF8] text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F1F5F9] mb-2">Share Your Preferences</h3>
              <p className="text-[#94A3B8]">
                Tell us about your dietary needs, health conditions, and food preferences during registration.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card p-6 text-center"
            >
              <div className="bg-[#38BDF8]/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#38BDF8] text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F1F5F9] mb-2">Get Personalized Recommendations</h3>
              <p className="text-[#94A3B8]">
                We'll suggest foods and restaurants that match your unique preferences and dietary requirements.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card p-6 text-center"
            >
              <div className="bg-[#38BDF8]/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#38BDF8] text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F1F5F9] mb-2">Order or Cook at Home</h3>
              <p className="text-[#94A3B8]">
                Order from our partner restaurants or access recipes to prepare healthy meals at home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Recommended Restaurants Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[#F1F5F9]"
            >
              {preferences ? 'Restaurants for You' : 'Popular Restaurants'}
            </motion.h2>
            <Link to="/restaurants" className="text-[#38BDF8] hover:text-[#38BDF8]/80 font-medium">
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38BDF8]"></div>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {recommendedRestaurants.map(restaurant => (
                <motion.div key={restaurant.id} variants={itemVariants}>
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#38BDF8] to-[#F43F5E]">
        <div className="container-custom text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-4 text-white"
          >
            Ready to Eat Healthier?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
          >
            Join ZestyLife today and discover food that's not just delicious but also good for your health.
          </motion.p>
          {!user ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link to="/register" className="btn bg-white text-[#38BDF8] hover:bg-gray-100 px-6 py-3 text-lg font-semibold">
                Sign Up Now
              </Link>
              <Link to="/login" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#38BDF8] px-6 py-3 text-lg font-semibold">
                Login
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/preferences" className="btn bg-white text-[#38BDF8] hover:bg-gray-100 px-6 py-3 text-lg font-semibold">
                Update Your Preferences
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;