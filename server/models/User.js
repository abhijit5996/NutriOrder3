import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  preferences: {
    dietaryRestrictions: [String],
    cuisinePreferences: [String],
    healthConscious: Boolean,
    allergies: [String],
    medicalConditions: [String],
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'spicy'],
      default: 'medium'
    }
  },
  hasCompletedPreferences: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index is automatically created due to unique: true on clerkUserId

const User = mongoose.model('User', userSchema);

export default User;