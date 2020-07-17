const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  ownerName: { type: String },
  dateUploaded: { type: Date, default: Date.now },
  numberOfServes: { type: Number },
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, default: 'Indian' },
  isVeg: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  image: { type: String },
  video: { type: String },
  tags: [{ type: String }],
  ingredients: [{ type: String }],
  ingredientDetails: [{ type: String }],
  steps: [{ type: String }],
  nutrition: {
    calorie: { type: String },
    carbohydrate: { type: String },
    fat: { type: String },
    protein: { type: String },
    cholesterol: { type: String },
    vitamin: { type: String },
    mineral: { type: String },
  },
  comments: [
    { user: { type: String, default: 'Guest' }, text: { type: String } },
  ],
});

module.exports = mongoose.model('Recipe', recipeSchema);
