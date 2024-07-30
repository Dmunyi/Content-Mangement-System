// controllers/recipeController.js
const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, category, cuisine } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      category,
      cuisine,
      createdBy: req.user.id
    });
    
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, category, cuisine } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // Check if user is the creator
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.category = category;
    recipe.cuisine = cuisine;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // Check if user is the creator
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await recipe.remove();
    res.json({ message: 'Recipe removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
