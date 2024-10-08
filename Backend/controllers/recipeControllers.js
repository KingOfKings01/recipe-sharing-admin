import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

export const getAllRecipes = async (req, res) => {
  try {
    // Get the user's UUID from the request, assuming it's passed in the request headers
    const userUuid = req.headers['x-user-uuid'];
    
    if (!userUuid) {
      return res.status(400).json({ message: 'User UUID is required' });
    }

    // Fetch recipes only created by the user
    const recipes = await Recipe.findAll({
      where: { userId: userUuid },
    });

    res.json(recipes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
};


// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
  try {

    // Fetch the recipe along with the associated user
    const recipe = await Recipe.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name'],
      }
    });

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};



export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      await recipe.destroy();
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
};
