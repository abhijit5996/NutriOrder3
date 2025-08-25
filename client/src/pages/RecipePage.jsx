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
      
      const sampleRecipes = [
        {
          id: 101,
          foodName: 'Quinoa Buddha Bowl',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          description: 'A nutritious and colorful bowl packed with protein-rich quinoa, fresh vegetables, and a flavorful tahini dressing.',
          prepTime: '15 mins', cookTime: '20 mins', servings: 2, difficulty: 'Easy',
          nutritionalInfo: { calories: 420, protein: 15, carbs: 52, fat: 18, fiber: 12 },
          ingredients: ['1 cup quinoa, rinsed', '2 cups vegetable broth', '1 medium sweet potato, diced', '1 tablespoon olive oil', '1 teaspoon cumin', '1/2 teaspoon paprika', '1/4 teaspoon salt', '1 cup chickpeas, drained and rinsed', '2 cups mixed greens', '1 avocado, sliced', '1/2 cup cherry tomatoes, halved', '1/4 cup red cabbage, shredded', '2 tablespoons pumpkin seeds'],
          dressing: ['3 tablespoons tahini', '1 tablespoon lemon juice', '1 tablespoon maple syrup', '2-3 tablespoons water', '1 clove garlic, minced', 'Salt and pepper to taste'],
          instructions: ['Cook quinoa according to package instructions, using vegetable broth instead of water for extra flavor.', 'Preheat oven to 400°F (200°C). Toss diced sweet potato with olive oil, cumin, paprika, and salt. Spread on a baking sheet and roast for 20 minutes or until tender.', 'While the sweet potato is roasting, prepare the dressing by whisking together all dressing ingredients until smooth. Add water as needed to reach desired consistency.', 'Assemble the bowls by dividing the quinoa between two bowls. Top with roasted sweet potato, chickpeas, mixed greens, avocado slices, cherry tomatoes, and red cabbage.', 'Drizzle with tahini dressing and sprinkle with pumpkin seeds.', 'Serve immediately or store components separately in the refrigerator for meal prep.'],
          tips: ['For meal prep, store the dressing separately and add just before eating.', 'Add grilled chicken or tofu for extra protein.', 'Customize with your favorite vegetables based on whats in season.', 'To save time, use pre-cooked quinoa and canned chickpeas.'],
          dietaryInfo: ['Vegan', 'Gluten-Free', 'High-Protein', 'High-Fiber'],
        },
        {
          id: 201,
          foodName: 'Butter Chicken',
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          description: 'A classic North Indian dish featuring tender chicken pieces in a rich, creamy tomato-based curry with butter and cream.',
          prepTime: '30 mins', cookTime: '25 mins', servings: 4, difficulty: 'Medium',
          nutritionalInfo: { calories: 580, protein: 32, carbs: 14, fat: 42, fiber: 3 },
          ingredients: ['800g boneless chicken thighs, cut into bite-sized pieces', '2 tablespoons lemon juice', '3 tablespoons yogurt', '1 tablespoon ginger-garlic paste', '1 teaspoon garam masala', '1 teaspoon red chili powder', '1 teaspoon cumin powder', '2 tablespoons butter', '2 tablespoons oil', '1 large onion, finely chopped', '2 green chilies, slit', '400g tomato puree', '1 teaspoon dried fenugreek leaves (kasuri methi)', '2 tablespoons fresh cream', '2 tablespoons fresh coriander, chopped', 'Salt to taste'],
          marinade: ['Mix chicken with lemon juice, yogurt, ginger-garlic paste, garam masala, red chili powder, cumin powder, and salt.', 'Marinate for at least 2 hours, preferably overnight in the refrigerator.'],
          instructions: ['Heat oil and butter in a large pan over medium heat. Add chopped onions and green chilies, and sauté until onions are golden brown.', 'Add marinated chicken and cook on high heat for 5 minutes until it starts to brown.', 'Add tomato puree and salt. Cover and simmer for 15 minutes until chicken is cooked through.', 'Crush dried fenugreek leaves between your palms and add to the curry. Simmer for another 5 minutes.', 'Stir in fresh cream and cook for 2 more minutes. Adjust salt and spices to taste.', 'Garnish with fresh coriander and serve hot with naan or rice.'],
          tips: ['For a healthier version, use low-fat yogurt and cream.', 'Boneless chicken thighs work best, but you can use chicken breast if preferred.', 'The longer you marinate the chicken, the more flavorful it will be.', 'Adding a little sugar can balance the acidity of the tomatoes.'],
          dietaryInfo: ['High-Protein', 'Gluten-Free'],
        },
      ];
      
      const foundRecipe = sampleRecipes.find(r => r.id === parseInt(id));
      setRecipe(foundRecipe);
      setLoading(false);
    };
    
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  
  if (!recipe) return (
    <div className="py-12"><div className="container-custom"><div className="card p-8 text-center text-white"><h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2><p className="text-gray-300 mb-6">The recipe you're looking for doesn't exist or has been removed.</p><Link to="/restaurants" className="btn btn-primary px-6 py-3">Browse Restaurants</Link></div></div></div>
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
            <Link to="/restaurants" className="text-primary hover:text-primary/80 font-medium flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Restaurants
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.foodName} Recipe</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.dietaryInfo.map((info, index) => <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">{info}</span>)}
            </div>
            <p className="text-gray-300 mb-6">{recipe.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[{label: 'Prep Time', value: recipe.prepTime}, {label: 'Cook Time', value: recipe.cookTime}, {label: 'Servings', value: recipe.servings}, {label: 'Difficulty', value: recipe.difficulty}].map(item => (
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
                {recipe.ingredients.map((ing, i) => <li key={i} className="flex items-start"><span className="text-primary mr-2 mt-1">&#10003;</span><span>{ing}</span></li>)}
              </ul>
              {recipe.dressing && <><h3 className="font-bold mt-6 mb-2">For the Dressing:</h3><ul className="space-y-3 text-gray-300">{recipe.dressing.map((item, i) => <li key={i} className="flex items-start"><span className="text-primary mr-2 mt-1">&#10003;</span><span>{item}</span></li>)}</ul></>}
              {recipe.marinade && <><h3 className="font-bold mt-6 mb-2">For the Marinade:</h3><ul className="space-y-3 text-gray-300">{recipe.marinade.map((item, i) => <li key={i} className="flex items-start"><span className="text-primary mr-2 mt-1">&#10003;</span><span>{item}</span></li>)}</ul></>}
            </motion.div>
            
            <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => <li key={i} className="flex"><span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary font-bold text-sm mr-4">{i + 1}</span><span className="text-gray-300">{step}</span></li>)}
              </ol>
            </motion.div>
          </div>
          
          <motion.div className="card p-6" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <h2 className="text-2xl font-bold mb-4">Chef's Tips</h2>
            <ul className="space-y-3">
              {recipe.tips.map((tip, i) => <li key={i} className="flex items-start"><span className="text-yellow-400 mr-3 mt-1">&#9733;</span><span className="text-gray-300">{tip}</span></li>)}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipePage;