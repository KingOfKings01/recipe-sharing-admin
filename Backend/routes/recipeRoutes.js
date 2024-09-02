import express from "express";

import {
  getAllRecipes,
  deleteRecipe,
} from "../controllers/recipeControllers.js";

import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authorization, getAllRecipes); // View all recipes
router.delete("/:id", authorization, deleteRecipe); // Delete inappropriate recipe

export default router;
