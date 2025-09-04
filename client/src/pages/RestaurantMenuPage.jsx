import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import FoodCard from '../components/ui/FoodCard';
import { motion } from 'framer-motion';

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

const RestaurantMenuPage = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const { user } = useUser();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  
  // Get user preferences from Clerk user metadata
  const preferences = user?.unsafeMetadata?.preferences || {};
  
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
      category: 'main course'
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
      category: 'breakfast'
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
      category: 'main course'
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
      category: 'appetizer'
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
      category: 'main course'
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
      category: 'main course'
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
      category: 'appetizer'
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
      category: 'bread'
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
      category: 'breakfast'
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
      category: 'main course'
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
      category: 'main course'
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
      category: 'snack'
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
      category: 'dessert'
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
      category: 'main course'
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
      category: 'beverage'
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
      category: 'breakfast'
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
      category: 'main course'
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
      category: 'dessert'
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
      category: 'main course'
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
      category: 'main course'
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
      category: 'breakfast'
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
      category: 'main course'
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
      category: 'main course'
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
      category: 'salad'
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
      category: 'breakfast'
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
      category: 'snack'
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
      category: 'salad'
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
      category: 'main course'
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
      category: 'main course'
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
      category: 'thali'
    }
  ];
  
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
        },
        {
          id: 3,
          name: 'North Indian Delights',
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          healthFocused: false,
          rating: 4.6,
          reviewCount: 410,
          location: 'Lajpat Nagar, New Delhi',
          cuisines: ['Biryani', 'Mughlai', 'North Indian'],
          dietaryOptions: ['Vegetarian', 'Non-Vegetarian'],
          description: 'Authentic North Indian cuisine with rich flavors and traditional recipes.'
        },
        {
          id: 4,
          name: 'Royal Cuisine',
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          healthFocused: true,
          rating: 4.3,
          reviewCount: 189,
          location: 'Vasant Kunj, New Delhi',
          cuisines: ['Healthy', 'Salads', 'Continental'],
          dietaryOptions: ['Vegan', 'Gluten-Free'],
          description: 'Royal dining experience with healthy and delicious options.'
        },
        {
          id: 5,
          name: 'Comfort Foods',
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          healthFocused: false,
          rating: 4.8,
          reviewCount: 520,
          location: 'Gurugram, Haryana',
          cuisines: ['Pizza', 'Italian', 'Fast Food'],
          dietaryOptions: ['Vegetarian', 'Non-Vegetarian'],
          description: 'Comfort food at its best with all your favorite dishes.'
        },
        {
          id: 6,
          name: 'Spice Route',
          image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          healthFocused: true,
          rating: 4.7,
          reviewCount: 310,
          location: 'Saket, New Delhi',
          cuisines: ['Japanese', 'Sushi', 'Asian'],
          dietaryOptions: ['Vegetarian', 'Non-Vegetarian'],
          description: 'Exotic Asian flavors with a healthy twist.'
        },
        {
          id: 7,
          name: 'Tandoori Specials',
          image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          healthFocused: false,
          rating: 4.4,
          reviewCount: 280,
          location: 'Cyber Hub, Gurugram',
          cuisines: ['Chinese', 'Thai', 'Asian'],
          dietaryOptions: ['Vegetarian', 'Non-Vegetarian'],
          description: 'Authentic tandoori dishes with traditional flavors.'
        },
        {
          id: 8,
          name: 'Gujarati Thali',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          healthFocused: true,
          rating: 4.5,
          reviewCount: 230,
          location: 'Ahmedabad, Gujarat',
          cuisines: ['Gujarati', 'Thali', 'Vegetarian'],
          dietaryOptions: ['Vegetarian'],
          description: 'Authentic Gujarati thali with traditional flavors.'
        },
        {
          id: 9,
          name: 'South Indian Delights',
          image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
          healthFocused: true,
          rating: 4.6,
          reviewCount: 340,
          location: 'Chennai, Tamil Nadu',
          cuisines: ['South Indian', 'Dosa', 'Idli'],
          dietaryOptions: ['Vegetarian'],
          description: 'Authentic South Indian cuisine with traditional recipes.'
        },
        {
          id: 10,
          name: 'Keto Kitchen',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
          healthFocused: true,
          rating: 4.7,
          reviewCount: 190,
          location: 'Mumbai, Maharashtra',
          cuisines: ['Keto', 'Low-Carb', 'Healthy'],
          dietaryOptions: ['Keto', 'Low-Carb'],
          description: 'Delicious keto-friendly meals for health-conscious diners.'
        }
      ];
      
      // Find the restaurant by ID from URL params
      const restaurantId = parseInt(id);
      const foundRestaurant = sampleRestaurants.find(r => r.id === restaurantId);
      
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        // Filter menu items by restaurant ID
        const restaurantMenuItems = foodItems.filter(item => item.restaurantId === restaurantId);
        setMenuItems(restaurantMenuItems);
        setFilteredItems(restaurantMenuItems);
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
            (item.dietaryInfo?.includes('Vegetarian') || item.dietaryInfo?.includes('Vegan')) : 
            item.dietaryInfo?.includes(restriction)
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
            return item.dietaryInfo?.includes('Low-Carb') || (item.nutritionalInfo && item.nutritionalInfo.carbs < 30);
          if (preferences.medicalConditions.includes('Heart Disease')) 
            return item.dietaryInfo?.includes('Low-Fat') || (item.nutritionalInfo && item.nutritionalInfo.fat < 15);
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