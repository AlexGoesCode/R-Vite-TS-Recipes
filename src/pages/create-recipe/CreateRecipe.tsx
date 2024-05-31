import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import './CreateRecipe.css';
import RecipeModal from '../../components/recipe-modal/RecipeModal';
import AddRecipeForm from '../../components/add-recipe-form/AddRecipeForm'; // Adjust the import path as necessary

type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  author: string;
};

const CreateRecipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Manage selected recipe

  // Function to fetch recipes from Firestore
  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];
      setRecipes(recipesList);
    } catch (err) {
      console.error('Error fetching recipes: ', err);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
      fetchRecipes(); // Fetch updated list of recipes after deleting one
      alert('Recipe deleted successfully!');
      setShowModal(false); // Close the modal after deletion
    } catch (err) {
      console.error('Error deleting document: ', err);
    }
  };

  const handleEditRecipe = () => {
    setShowModal(false); // Close the modal after clicking edit
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes on component mount
  }, []);

  return (
    <div className='create-recipe-container'>
      <h2>Create Recipe</h2>
      <AddRecipeForm fetchRecipes={fetchRecipes} />

      <div className='grid-container'>
        {recipes.map((recipe) => (
          <div key={recipe.id} className='grid-item'>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions}</p>
            <button onClick={() => handleRecipeClick(recipe)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal
          showModal={showModal}
          selectedRecipe={selectedRecipe}
          handleCloseModal={handleCloseModal}
          handleEditRecipe={handleEditRecipe}
          handleDeleteRecipe={handleDeleteRecipe}
        />
      )}
    </div>
  );
};

export default CreateRecipe;
