import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import RestaurantCard from '../components/ui/RestaurantCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Import all food images
import BajraKhichdi from '../assets/images/Bajra-Khichdi.jpg';
import BesanChilla from '../assets/images/besan-chilla.jpg';
import ChannaSaag from '../assets/images/Channa-Saag.jpg';
import DahiKeKebab from '../assets/images/Dahi_Ke_Kebab.jpg';
import DalKhichdi from '../assets/images/Dal-Khichdi.jpg';
import EggCurry from '../assets/images/egg-curry.jpg';
import GrilledPaneerTikka from '../assets/images/grilled paneer tikka.jpg';
import GujaratiMethiThepla from '../assets/images/Gujarati-Methi-Thepla.jpg';
import IdliSambar from '../assets/images/Idli-and-Sambar.jpg';
import KadaiPaneer from '../assets/images/Kadai-Paneer.jpg';
import KetoButterChicken from '../assets/images/keto-butter-chicken.jpg';
import KhamanDhokla from '../assets/images/khaman-dhokla.jpg';
import Kheer from '../assets/images/Kheer.jpg';
import LaukiChanaDal from '../assets/images/lauki-chana-dal.jpg';
import MasalaChai from '../assets/images/Masala-Chai.jpg';
import MasalaOats from '../assets/images/masala-oats-recipe.jpg';
import MiletKhichdi from '../assets/images/milet-khichdi.jpg';
import MoongDalHalwa from '../assets/images/moong-dal-halwa.jpg';
import MutterMushroom from '../assets/images/mutter-mushroom.jpg';
import NutrelaSoyChunkCurry from '../assets/images/Nutrela-soy-chunk-curry.jpg';
import QuinoaUpma from '../assets/images/quinoa-upma.jpg';
import RajmaChawal from '../assets/images/Rajma-chawal.jpg';
import SaagPaneer from '../assets/images/Saag-Paneer-1.jpg';
import SproutedMoongSalad from '../assets/images/Sprouted-moong-salad.jpg';
import SproutedRagiDosa from '../assets/images/Sprouted-Ragi-Dosa_.jpg';
import SweetPotatoChaat from '../assets/images/sweet-potato-chaat.jpg';
import TandooriChickenSalad from '../assets/images/Tandoori-chicken-salad.jpg';
import TandooriFishTikka from '../assets/images/Tandoori-Fish-tikka.jpg';
import VegPulao from '../assets/images/veg-pulao.jpg';
import VegThali from '../assets/images/veg-thali.jpg';

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
      
      // Food items with local images
      const foodItems = [
        {
          id: 1,
          name: 'Bajra Khichdi',
          description: 'Healthy millet-based khichdi with vegetables and spices.',
          price: 180,
          image: BajraKhichdi,
          rating: 4.3,
          reviewCount: 89,
          isHealthy: true,
          restaurant: 'Healthy Bites',
          restaurantId: 1,
        },
        {
          id: 2,
          name: 'Besan Chilla',
          description: 'Savory gram flour pancakes with herbs and spices.',
          price: 120,
          image: BesanChilla,
          rating: 4.5,
          reviewCount: 112,
          isHealthy: true,
          restaurant: 'Breakfast Corner',
          restaurantId: 2,
        },
        {
          id: 3,
          name: 'Channa Saag',
          description: 'Chickpeas cooked with spinach and traditional spices.',
          price: 190,
          image: ChannaSaag,
          rating: 4.4,
          reviewCount: 95,
          isHealthy: true,
          restaurant: 'North Indian Delights',
          restaurantId: 3,
        },
        {
          id: 4,
          name: 'Dahi Ke Kebab',
          description: 'Yogurt-based kebabs with a crispy exterior and soft interior.',
          price: 220,
          image: DahiKeKebab,
          rating: 4.7,
          reviewCount: 134,
          isHealthy: false,
          restaurant: 'Royal Cuisine',
          restaurantId: 4,
        },
        {
          id: 5,
          name: 'Dal Khichdi',
          description: 'Comforting lentil and rice porridge with ghee and spices.',
          price: 150,
          image: DalKhichdi,
          rating: 4.6,
          reviewCount: 178,
          isHealthy: true,
          restaurant: 'Comfort Foods',
          restaurantId: 5,
        },
        {
          id: 6,
          name: 'Egg Curry',
          description: 'Hard-boiled eggs in a rich and spicy gravy.',
          price: 200,
          image: EggCurry,
          rating: 4.5,
          reviewCount: 156,
          isHealthy: false,
          restaurant: 'Spice Route',
          restaurantId: 6,
        },
        {
          id: 7,
          name: 'Grilled Paneer Tikka',
          description: 'Marinated cottage cheese grilled to perfection.',
          price: 240,
          image: GrilledPaneerTikka,
          rating: 4.8,
          reviewCount: 210,
          isHealthy: true,
          restaurant: 'Tandoori Specials',
          restaurantId: 7,
        },
        {
          id: 8,
          name: 'Gujarati Methi Thepla',
          description: 'Fenugreek-flavored flatbread from Gujarat.',
          price: 110,
          image: GujaratiMethiThepla,
          rating: 4.4,
          reviewCount: 98,
          isHealthy: true,
          restaurant: 'Gujarati Thali',
          restaurantId: 8,
        },
        {
          id: 9,
          name: 'Idli and Sambar',
          description: 'Steamed rice cakes served with lentil stew and chutney.',
          price: 130,
          image: IdliSambar,
          rating: 4.7,
          reviewCount: 245,
          isHealthy: true,
          restaurant: 'South Indian Delights',
          restaurantId: 9,
        },
        {
          id: 10,
          name: 'Kadai Paneer',
          description: 'Spicy cottage cheese curry with capsicum and onions.',
          price: 250,
          image: KadaiPaneer,
          rating: 4.8,
          reviewCount: 312,
          isHealthy: false,
          restaurant: 'North Indian Delights',
          restaurantId: 3,
        },
        {
          id: 11,
          name: 'Keto Butter Chicken',
          description: 'Low-carb version of the classic butter chicken.',
          price: 280,
          image: KetoButterChicken,
          rating: 4.6,
          reviewCount: 145,
          isHealthy: true,
          restaurant: 'Keto Kitchen',
          restaurantId: 10,
        },
        {
          id: 12,
          name: 'Khaman Dhokla',
          description: 'Steamed savory chickpea flour cakes from Gujarat.',
          price: 120,
          image: KhamanDhokla,
          rating: 4.5,
          reviewCount: 187,
          isHealthy: true,
          restaurant: 'Gujarati Thali',
          restaurantId: 8,
        },
        {
          id: 13,
          name: 'Kheer',
          description: 'Traditional rice pudding with nuts and cardamom.',
          price: 140,
          image: Kheer,
          rating: 4.9,
          reviewCount: 276,
          isHealthy: false,
          restaurant: 'Sweet Tooth',
          restaurantId: 11,
        },
        {
          id: 14,
          name: 'Lauki Chana Dal',
          description: 'Bottle gourd cooked with split chickpeas and spices.',
          price: 160,
          image: LaukiChanaDal,
          rating: 4.3,
          reviewCount: 92,
          isHealthy: true,
          restaurant: 'Healthy Bites',
          restaurantId: 1,
        },
        {
          id: 15,
          name: 'Masala Chai',
          description: 'Spiced Indian tea with milk and aromatic spices.',
          price: 60,
          image: MasalaChai,
          rating: 4.8,
          reviewCount: 345,
          isHealthy: false,
          restaurant: 'Chai Point',
          restaurantId: 12,
        },
        {
          id: 16,
          name: 'Masala Oats',
          description: 'Spiced oats with vegetables and herbs.',
          price: 130,
          image: MasalaOats,
          rating: 4.4,
          reviewCount: 118,
          isHealthy: true,
          restaurant: 'Healthy Bites',
          restaurantId: 1,
        },
        {
          id: 17,
          name: 'Milet Khichdi',
          description: 'Nutritious millet khichdi with vegetables.',
          price: 170,
          image: MiletKhichdi,
          rating: 4.5,
          reviewCount: 104,
          isHealthy: true,
          restaurant: 'Healthy Bites',
          restaurantId: 1,
        },
        {
          id: 18,
          name: 'Moong Dal Halwa',
          description: 'Sweet lentil pudding with ghee and nuts.',
          price: 180,
          image: MoongDalHalwa,
          rating: 4.7,
          reviewCount: 198,
          isHealthy: false,
          restaurant: 'Sweet Tooth',
          restaurantId: 11,
        },
        {
          id: 19,
          name: 'Mutter Mushroom',
          description: 'Peas and mushrooms in a creamy tomato gravy.',
          price: 220,
          image: MutterMushroom,
          rating: 4.6,
          reviewCount: 156,
          isHealthy: true,
          restaurant: 'Vegetarian Delight',
          restaurantId: 13,
        },
        {
          id: 20,
          name: 'Nutrela Soy Chunk Curry',
          description: 'Protein-rich soy chunks in a spicy curry.',
          price: 190,
          image: NutrelaSoyChunkCurry,
          rating: 4.3,
          reviewCount: 87,
          isHealthy: true,
          restaurant: 'Protein Hub',
          restaurantId: 14,
        },
        {
          id: 21,
          name: 'Quinoa Upma',
          description: 'Healthy quinoa preparation with vegetables and spices.',
          price: 200,
          image: QuinoaUpma,
          rating: 4.5,
          reviewCount: 112,
          isHealthy: true,
          restaurant: 'Healthy Bites',
          restaurantId: 1,
        },
        {
          id: 22,
          name: 'Rajma Chawal',
          description: 'Kidney bean curry served with steamed rice.',
          price: 180,
          image: RajmaChawal,
          rating: 4.8,
          reviewCount: 267,
          isHealthy: true,
          restaurant: 'North Indian Delights',
          restaurantId: 3,
        },
        {
          id: 23,
          name: 'Saag Paneer',
          description: 'Spinach curry with cottage cheese cubes.',
          price: 230,
          image: SaagPaneer,
          rating: 4.7,
          reviewCount: 201,
          isHealthy: true,
          restaurant: 'North Indian Delights',
          restaurantId: 3,
        },
        {
          id: 24,
          name: 'Sprouted Moong Salad',
          description: 'Healthy salad with sprouted mung beans and vegetables.',
          price: 150,
          image: SproutedMoongSalad,
          rating: 4.6,
          reviewCount: 134,
          isHealthy: true,
          restaurant: 'Salad Bar',
          restaurantId: 15,
        },
        {
          id: 25,
          name: 'Sprouted Ragi Dosa',
          description: 'Fermented crepe made with sprouted ragi flour.',
          price: 160,
          image: SproutedRagiDosa,
          rating: 4.4,
          reviewCount: 98,
          isHealthy: true,
          restaurant: 'South Indian Delights',
          restaurantId: 9,
        },
        {
          id: 26,
          name: 'Sweet Potato Chaat',
          description: 'Spicy and tangy sweet potato street food.',
          price: 140,
          image: SweetPotatoChaat,
          rating: 4.5,
          reviewCount: 123,
          isHealthy: true,
          restaurant: 'Street Food Corner',
          restaurantId: 16,
        },
        {
          id: 27,
          name: 'Tandoori Chicken Salad',
          description: 'Grilled chicken with fresh vegetables and dressing.',
          price: 260,
          image: TandooriChickenSalad,
          rating: 4.6,
          reviewCount: 178,
          isHealthy: true,
          restaurant: 'Salad Bar',
          restaurantId: 15,
        },
        {
          id: 28,
          name: 'Tandoori Fish Tikka',
          description: 'Marinated fish grilled in tandoor.',
          price: 320,
          image: TandooriFishTikka,
          rating: 4.7,
          reviewCount: 156,
          isHealthy: true,
          restaurant: 'Coastal Cuisine',
          restaurantId: 17,
        },
        {
          id: 29,
          name: 'Veg Pulao',
          description: 'Fragrant rice cooked with vegetables and spices.',
          price: 170,
          image: VegPulao,
          rating: 4.5,
          reviewCount: 189,
          isHealthy: true,
          restaurant: 'Rice Bowl',
          restaurantId: 18,
        },
        {
          id: 30,
          name: 'Veg Thali',
          description: 'Complete meal with various dishes, bread, rice, and dessert.',
          price: 280,
          image: VegThali,
          rating: 4.8,
          reviewCount: 312,
          isHealthy: true,
          restaurant: 'Thali House',
          restaurantId: 19,
        }
      ];
      
      const sampleRestaurants = [
        {
          id: 1,
          name: 'Healthy Bites',
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
          name: 'Breakfast Corner',
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
          name: 'North Indian Delights',
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
          name: 'Royal Cuisine',
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
          name: 'Comfort Foods',
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
          name: 'Spice Route',
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
          name: 'Tandoori Specials',
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
        const filteredFoods = foodItems.filter(food => {
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
        setFeaturedFoods(foodItems);
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredFoods.slice(0, 6).map(food => (
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