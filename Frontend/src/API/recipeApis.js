import axios from 'axios';

// Base API URL
const API_URL = `${import.meta.env.VITE_API}/recipes`;

// Function to get all recipes
export async function getUserRecipes(userUuid) {
  try {
    
    const response = await axios.get(`${API_URL}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authentication token
        'x-user-uuid': userUuid, // User's UUID
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
      'Something went wrong while fetching recipes. Please try again later.'
    );
  }
}

// Function to get a single recipe by ID
export async function getRecipeById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(
      err?.response?.data?.message ||
      `Something went wrong while fetching the recipe. Please try again later.`
    );
  }
}

// Function to delete a recipe by ID
export async function deleteRecipe(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message ||
      'Something went wrong while deleting the recipe. Please try again later.'
    );
  }
}
