const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  label: String,
  image: String,
  source: String,
  url: String,
  dietLabels: Array,
  healthLabels: Array,
  ingredientLines: Array,
  ingredients: Array,
  calories: Number,
  totalTime: Number
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
