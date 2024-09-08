import express from "express";

import {
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
} from "../controllers/recipeControllers.js";

import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authorization, getAllRecipes); // View all recipes

router.get('/:id', authorization, getRecipeById); // Get recipe by id

router.delete("/:id", authorization, deleteRecipe); // Delete inappropriate recipe

export default router;
