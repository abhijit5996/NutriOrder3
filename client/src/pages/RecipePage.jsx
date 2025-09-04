import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipe = () => {
      setLoading(true);
      
      // Sample recipes with slugs
      const sampleRecipes = [
        {
          id: 1,
          slug: 'paneer-butter-masala',
          foodName: 'Paneer Butter Masala',
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          description: 'Creamy and rich paneer curry with tomatoes, butter, and spices.',
          prepTime: '15 mins', 
          cookTime: '20 mins', 
          servings: 4, 
          difficulty: 'Medium',
          nutritionalInfo: { calories: 420, protein: 15, carbs: 20, fat: 32, fiber: 3 },
          ingredients: [
            '250g paneer, cubed',
            '2 tbsp butter',
            '1 large onion, finely chopped',
            '2 tomatoes, pureed',
            '1 tbsp ginger-garlic paste',
            '1/2 cup cream',
            '1 tsp garam masala',
            '1 tsp red chili powder',
            '1/2 tsp turmeric powder',
            '1 tsp kasuri methi',
            'Salt to taste',
            'Fresh coriander for garnish'
          ],
          instructions: [
            'Heat butter in a pan and sauté onions until golden brown.',
            'Add ginger-garlic paste and cook for 1 minute.',
            'Add tomato puree and cook until oil separates.',
            'Add spices and cook for 2 minutes.',
            'Add paneer and cream, simmer for 5 minutes.',
            'Garnish with kasuri methi and coriander.',
            'Serve hot with naan or rice.'
          ],
          tips: [
            'Soak paneer in warm water for 10 minutes to make it soft.',
            'Adjust cream quantity as per your preference.',
            'You can add a pinch of sugar to balance the acidity.'
          ],
          dietaryInfo: ['Vegetarian', 'High-Protein'],
        },
        {
          id: 2,
          slug: 'masala-dosa',
          foodName: 'Masala Dosa',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          description: 'Crispy rice crepe with spiced potato filling, served with sambar.',
          prepTime: '8 hours', 
          cookTime: '20 mins', 
          servings: 4, 
          difficulty: 'Medium',
          nutritionalInfo: { calories: 250, protein: 6, carbs: 40, fat: 7, fiber: 4 },
          ingredients: [
            '2 cups rice',
            '1/2 cup urad dal',
            '1/2 tsp fenugreek seeds',
            'Salt to taste',
            'Oil for cooking',
            'For potato filling: 4 potatoes, 1 onion, mustard seeds, curry leaves, turmeric'
          ],
          instructions: [
            'Soak rice and dal separately for 6 hours.',
            'Grind to make a smooth batter, ferment overnight.',
            'Heat a dosa pan, spread batter thinly.',
            'Cook until crispy, add potato filling.',
            'Fold and serve with sambar and chutney.'
          ],
          tips: [
            'Batter consistency is key for perfect dosas.',
            'Keep the pan at medium heat for even cooking.'
          ],
          dietaryInfo: ['Vegetarian', 'Gluten-Free'],
        },
        {
          id: 3,
          slug: 'chicken-biryani',
          foodName: 'Chicken Biryani',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          description: 'Fragrant basmati rice with tender chicken and aromatic spices.',
          prepTime: '30 mins', 
          cookTime: '40 mins', 
          servings: 6, 
          difficulty: 'Medium',
          nutritionalInfo: { calories: 550, protein: 30, carbs: 70, fat: 15, fiber: 5 },
          ingredients: [
            '500g basmati rice',
            '1kg chicken, cut into pieces',
            '2 large onions, sliced',
            '2 tomatoes, chopped',
            '1/2 cup yogurt',
            'Whole spices: bay leaves, cardamom, cinnamon, cloves',
            'Biryani masala',
            'Saffron strands soaked in milk',
            'Mint and coriander leaves',
            'Ghee and oil'
          ],
          instructions: [
            'Marinate chicken with yogurt and spices for 1 hour.',
            'Parboil rice with whole spices.',
            'Layer rice and chicken in a heavy bottomed pot.',
            'Add saffron milk, fried onions, and herbs.',
            'Cook on dum (slow heat) for 20 minutes.',
            'Serve hot with raita.'
          ],
          tips: [
            'Soak rice for 30 minutes before cooking.',
            'Use aged basmati rice for best results.',
            'Don\'t overcook the rice before layering.'
          ],
          dietaryInfo: ['High-Protein'],
        }
      ];
      
      // Find recipe by slug (id parameter)
      const foundRecipe = sampleRecipes.find(r => r.slug === id);
      setRecipe(foundRecipe);
      setLoading(false);
    };
    
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  
  if (!recipe) return (
    <div className="py-12">
      <div className="container-custom">
        <div className="card p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
          <p className="text-gray-300 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary px-6 py-3">Back to Home</Link>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="py-8 text-white">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <Link to="/" className="text-primary hover:text-primary/80 font-medium flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.foodName} Recipe</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.dietaryInfo.map((info, index) => (
                <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {info}
                </span>
              ))}
            </div>
            <p className="text-gray-300 mb-6">{recipe.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                {label: 'Prep Time', value: recipe.prepTime}, 
                {label: 'Cook Time', value: recipe.cookTime}, 
                {label: 'Servings', value: recipe.servings}, 
                {label: 'Difficulty', value: recipe.difficulty}
              ].map(item => (
                <div key={item.label} className="bg-white/10 p-4 rounded-lg text-center">
                  <span className="block text-gray-400 text-sm">{item.label}</span>
                  <span className="block text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div className="mb-8 rounded-xl overflow-hidden shadow-lg" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <img src={recipe.image} alt={recipe.foodName} className="w-full h-96 object-cover"/>
          </motion.div>
          
          <motion.div className="mb-8 card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-primary">{value}{key !== 'calories' && 'g'}</div>
                  <div className="text-gray-400 text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-3 text-gray-300">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">&#10003;</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary font-bold text-sm mr-4">
                      {i + 1}
                    </span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
          
          {recipe.tips && recipe.tips.length > 0 && (
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Chef's Tips</h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1">&#9733;</span>
                    <span className="text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecipePage;