import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeById } from '../API/recipeApis';
import '../detail_page.css'

function RecipeDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [reviewError, setReviewError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert("Please login first!")
            navigate('/login')
        }

        const fetchRecipe = async () => {
            try {
                const data = await getRecipeById(id);
                // console.log(data);
                setRecipe(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!recipe) return <p>No recipe found</p>;

    return (
        <div className='container'>
            <h1>{recipe.title}</h1>
            <div className='card'>
                <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className='food-image'
                    onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = "../../public/Food.svg";
                    }}
                />

                <div className='details'>
                    <p>Total: {recipe.numberOfFeedbacks || "No feedbacks yet!"}</p>
                    <p>Ratings: {recipe.averageRating || "No ratings yet!"}</p>
                    <p>Dietary Preference: {recipe.dietaryPreference}</p>
                    <p>Cooking Time: {recipe.cookingTime}</p>
                    <p>Servings: {recipe.servings}</p>
                    <p>Category: {recipe.categories}</p>
                    <p>Preparation Time: {recipe.preparationTime}</p>
                    <p>Difficulty Level: {recipe.difficultyLevel}</p>
                    <p>Posted by: {recipe.User?.name}</p>

                </div>

            </div>



            <h2>Ingredients</h2>
            <pre>{recipe.ingredients}</pre>
            <h2>Instructions</h2>
            <pre>{recipe.instructions}</pre>

        </div>
    );
}

export default RecipeDetails;
