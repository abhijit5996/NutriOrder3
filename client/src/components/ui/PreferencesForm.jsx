import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';

const PreferencesForm = ({ onSubmit, onSkip }) => {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    cuisinePreferences: [],
    healthConscious: false,
    allergies: [],
    medicalConditions: [],
    spiceLevel: 'medium',
  });
  
  const [otherAllergy, setOtherAllergy] = useState('');
  const [otherMedicalCondition, setOtherMedicalCondition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  
  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo',
    'Low-Carb',
    'Low-Fat',
    'Low-Sodium',
  ];
  
  const cuisineOptions = [
    'North Indian',
    'South Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Thai',
    'Japanese',
    'Mediterranean',
    'Continental',
    'Bengali',
    'Punjabi',
    'Gujarati',
  ];
  
  const allergyOptions = [
    'Peanuts',
    'Tree Nuts',
    'Milk',
    'Eggs',
    'Wheat',
    'Soy',
    'Fish',
    'Shellfish',
    'Sesame',
    'Other',
  ];
  
  const medicalConditionOptions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Obesity',
    'GERD/Acid Reflux',
    'IBS',
    'Celiac Disease',
    'Lactose Intolerance',
    'Other',
  ];
  
  const handleDietaryChange = (option) => {
    setPreferences(prev => {
      const updatedRestrictions = prev.dietaryRestrictions.includes(option)
        ? prev.dietaryRestrictions.filter(item => item !== option)
        : [...prev.dietaryRestrictions, option];
      
      return { ...prev, dietaryRestrictions: updatedRestrictions };
    });
  };
  
  const handleCuisineChange = (option) => {
    setPreferences(prev => {
      const updatedCuisines = prev.cuisinePreferences.includes(option)
        ? prev.cuisinePreferences.filter(item => item !== option)
        : [...prev.cuisinePreferences, option];
      
      return { ...prev, cuisinePreferences: updatedCuisines };
    });
  };
  
  const handleAllergyChange = (option) => {
    setPreferences(prev => {
      const updatedAllergies = prev.allergies.includes(option)
        ? prev.allergies.filter(item => item !== option)
        : [...prev.allergies, option];
      
      return { ...prev, allergies: updatedAllergies };
    });
  };
  
  const handleMedicalConditionChange = (option) => {
    setPreferences(prev => {
      const updatedConditions = prev.medicalConditions.includes(option)
        ? prev.medicalConditions.filter(item => item !== option)
        : [...prev.medicalConditions, option];
      
      return { ...prev, medicalConditions: updatedConditions };
    });
  };
  
  const handleAddOtherAllergy = () => {
    if (otherAllergy.trim() && !preferences.allergies.includes(otherAllergy.trim())) {
      setPreferences(prev => ({
        ...prev,
        allergies: [...prev.allergies, otherAllergy.trim()]
      }));
      setOtherAllergy('');
    }
  };
  
  const handleAddOtherMedicalCondition = () => {
    if (otherMedicalCondition.trim() && !preferences.medicalConditions.includes(otherMedicalCondition.trim())) {
      setPreferences(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, otherMedicalCondition.trim()]
      }));
      setOtherMedicalCondition('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send preferences to backend
      const response = await fetch('http://localhost:5000/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkUserId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          preferences
        }),
      });
      
      if (response.ok) {
        onSubmit(preferences);
      } else {
        console.error('Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gradient mb-6 text-center">Tell Us About Your Food Preferences</h2>
      <p className="text-gray-400 mb-6 text-center">
        Help us personalize your food recommendations based on your preferences and dietary needs.
      </p>
      
      <form onSubmit={handleSubmit}>
        {/* Dietary Restrictions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Dietary Restrictions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryOptions.map(option => (
              <motion.label 
                key={option} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  preferences.dietaryRestrictions.includes(option) 
                    ? 'bg-primary/20 border-primary' 
                    : 'border-gray-700 hover:border-primary'
                }`}
              >
                <input 
                  type="checkbox"
                  className="hidden"
                  checked={preferences.dietaryRestrictions.includes(option)}
                  onChange={() => handleDietaryChange(option)}
                />
                <span className={`w-5 h-5 rounded border flex-shrink-0 mr-2 flex items-center justify-center ${
                  preferences.dietaryRestrictions.includes(option) 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-600'
                }`}>
                  {preferences.dietaryRestrictions.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white">{option}</span>
              </motion.label>
            ))}
          </div>
        </div>
        
        {/* Cuisine Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Cuisine Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cuisineOptions.map(option => (
              <motion.label 
                key={option} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  preferences.cuisinePreferences.includes(option) 
                    ? 'bg-primary/20 border-primary' 
                    : 'border-gray-700 hover:border-primary'
                }`}
              >
                <input 
                  type="checkbox"
                  className="hidden"
                  checked={preferences.cuisinePreferences.includes(option)}
                  onChange={() => handleCuisineChange(option)}
                />
                <span className={`w-5 h-5 rounded border flex-shrink-0 mr-2 flex items-center justify-center ${
                  preferences.cuisinePreferences.includes(option) 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-600'
                }`}>
                  {preferences.cuisinePreferences.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white">{option}</span>
              </motion.label>
            ))}
          </div>
        </div>
        
        {/* Health Conscious */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Are you health conscious?</h3>
          <div className="flex items-center space-x-4">
            <motion.label 
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
            >
              <input 
                type="radio"
                className="hidden"
                checked={preferences.healthConscious === true}
                onChange={() => setPreferences(prev => ({ ...prev, healthConscious: true }))}
              />
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                preferences.healthConscious === true ? 'border-primary' : 'border-gray-600'
              }`}>
                {preferences.healthConscious === true && (
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                )}
              </span>
              <span className="ml-2 text-white">Yes</span>
            </motion.label>
            
            <motion.label 
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
            >
              <input 
                type="radio"
                className="hidden"
                checked={preferences.healthConscious === false}
                onChange={() => setPreferences(prev => ({ ...prev, healthConscious: false }))}
              />
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                preferences.healthConscious === false ? 'border-primary' : 'border-gray-600'
              }`}>
                {preferences.healthConscious === false && (
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                )}
              </span>
              <span className="ml-2 text-white">No</span>
            </motion.label>
          </div>
        </div>
        
        {/* Allergies */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Food Allergies</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
            {allergyOptions.map(option => (
              <motion.label 
                key={option} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  preferences.allergies.includes(option) 
                    ? 'bg-primary/20 border-primary' 
                    : 'border-gray-700 hover:border-primary'
                }`}
              >
                <input 
                  type="checkbox"
                  className="hidden"
                  checked={preferences.allergies.includes(option)}
                  onChange={() => handleAllergyChange(option)}
                />
                <span className={`w-5 h-5 rounded border flex-shrink-0 mr-2 flex items-center justify-center ${
                  preferences.allergies.includes(option) 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-600'
                }`}>
                  {preferences.allergies.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white">{option}</span>
              </motion.label>
            ))}
          </div>
          
          {preferences.allergies.includes('Other') && (
            <div className="flex items-center mt-2">
              <input 
                type="text"
                value={otherAllergy}
                onChange={(e) => setOtherAllergy(e.target.value)}
                placeholder="Specify other allergy"
                className="input-field flex-1 rounded-r-none"
              />
              <motion.button 
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddOtherAllergy}
                className="bg-primary text-white p-3 rounded-r-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Add
              </motion.button>
            </div>
          )}
          
          {preferences.allergies.length > 0 && preferences.allergies.some(allergy => allergy !== 'Other') && (
            <div className="mt-3 flex flex-wrap gap-2">
              {preferences.allergies.filter(allergy => allergy !== 'Other').map(allergy => (
                <motion.span 
                  key={allergy} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {allergy}
                  <button 
                    type="button"
                    onClick={() => handleAllergyChange(allergy)}
                    className="ml-1 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.span>
              ))}
            </div>
          )}
        </div>
        
        {/* Medical Conditions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Medical Conditions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {medicalConditionOptions.map(option => (
              <motion.label 
                key={option} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  preferences.medicalConditions.includes(option) 
                    ? 'bg-primary/20 border-primary' 
                    : 'border-gray-700 hover:border-primary'
                }`}
              >
                <input 
                  type="checkbox"
                  className="hidden"
                  checked={preferences.medicalConditions.includes(option)}
                  onChange={() => handleMedicalConditionChange(option)}
                />
                <span className={`w-5 h-5 rounded border flex-shrink-0 mr-2 flex items-center justify-center ${
                  preferences.medicalConditions.includes(option) 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-600'
                }`}>
                  {preferences.medicalConditions.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-white">{option}</span>
              </motion.label>
            ))}
          </div>
          
          {preferences.medicalConditions.includes('Other') && (
            <div className="flex items-center mt-2">
              <input 
                type="text"
                value={otherMedicalCondition}
                onChange={(e) => setOtherMedicalCondition(e.target.value)}
                placeholder="Specify other medical condition"
                className="input-field flex-1 rounded-r-none"
              />
              <motion.button 
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddOtherMedicalCondition}
                className="bg-primary text-white p-3 rounded-r-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Add
              </motion.button>
            </div>
          )}
          
          {preferences.medicalConditions.length > 0 && preferences.medicalConditions.some(condition => condition !== 'Other') && (
            <div className="mt-3 flex flex-wrap gap-2">
              {preferences.medicalConditions.filter(condition => condition !== 'Other').map(condition => (
                <motion.span 
                  key={condition} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {condition}
                  <button 
                    type="button"
                    onClick={() => handleMedicalConditionChange(condition)}
                    className="ml-1 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.span>
              ))}
            </div>
          )}
        </div>
        
        {/* Spice Level */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">Preferred Spice Level</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Mild</span>
              <span className="text-sm text-gray-400">Medium</span>
              <span className="text-sm text-gray-400">Spicy</span>
            </div>
            <input 
              type="range"
              min="1"
              max="3"
              step="1"
              value={preferences.spiceLevel === 'mild' ? 1 : preferences.spiceLevel === 'medium' ? 2 : 3}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setPreferences(prev => ({
                  ...prev,
                  spiceLevel: value === 1 ? 'mild' : value === 2 ? 'medium' : 'spicy'
                }));
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary px-8 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Preferences'}
          </motion.button>
          
          <motion.button 
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSkip}
            className="btn btn-outline px-8 py-3"
          >
            Skip for Now
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PreferencesForm;