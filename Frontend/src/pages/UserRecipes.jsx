import { useEffect, useState } from "react";
import {
    Link,
    useParams,
    // useNavigate 
} from "react-router-dom";
import { getUserRecipes, deleteRecipe } from "../API/recipeApis"; // Adjust the path to your recipeApis file

export default function UserRecipes() {
    const { userUuid } = useParams(); // Extract the user's UUID from the URL params
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        // Fetch the user's recipes when the component mounts
        async function fetchRecipes() {
            try {
                const data = await getUserRecipes(userUuid);
                setRecipes(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchRecipes();
    }, [userUuid]);

    const handleDelete = async (recipeId) => {
        try {
            await deleteRecipe(recipeId)
            alert("Recipe deleted")
            setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>User&#39;s Recipes</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {recipes.length === 0 ? (
                <p>No recipes found for this user.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.id}>
                                <td><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></td>
                                <td>
                                    <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
