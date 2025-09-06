// src/pages/FoodsPage.jsx
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import RecipeCard from '../components/RecipeCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Import all food images (same as in HomePage)
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

const FoodsPage = () => {
  const { addItem } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      
      // Same food items array as in HomePage
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
      
      setFoods(foodItems);
      setLoading(false);
    };
    
    fetchFoods();
  }, []);

  // Removed duplicate handleAddToCart function

  const filteredFoods = filter === 'all' 
    ? foods 
    : filter === 'healthy' 
      ? foods.filter(food => food.isHealthy)
      : foods.filter(food => !food.isHealthy);

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
      <div className="container-custom">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-[#F1F5F9]"
        >
          All Foods
        </motion.h1>

        {/* Filter Options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-4 mb-8"
        >
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' 
                ? 'bg-[#38BDF8] text-white' 
                : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]'
            }`}
          >
            All Foods
          </button>
          <button 
            onClick={() => setFilter('healthy')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'healthy' 
                ? 'bg-[#38BDF8] text-white' 
                : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]'
            }`}
          >
            Healthy Options
          </button>
          <button 
            onClick={() => setFilter('treat')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'treat' 
                ? 'bg-[#38BDF8] text-white' 
                : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]'
            }`}
          >
            Occasional Treats
          </button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38BDF8]"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFoods.map(food => (
              <motion.div key={food.id} variants={itemVariants}>
                <RecipeCard 
                  food={food}
                  showRestaurant={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodsPage;