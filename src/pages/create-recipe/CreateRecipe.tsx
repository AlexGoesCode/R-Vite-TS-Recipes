import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import './CreateRecipe.css';
import RecipeModal from '../../components/recipe-modal/RecipeModal';
import AddRecipeForm from '../../components/add-recipe-form/AddRecipeForm'; // Adjust the import path as necessary

// Define Recipe type -  to ensure TypeScript type checking.
type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  author: string;
};

// define the CreateRecipe component
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

  // Function to delete a recipe from Firestore and update the list
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

  // Close the modal after clicking edit
  const handleEditRecipe = () => {
    setShowModal(false);
  };

  // Handle recipe click to show modal
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Render the component, Create the layout using JSX and custom CSS classes.
  return (
    <div className='create-recipe-container'>
      <h2>Create Recipe</h2>
      // add new recipes and display them in a grid layout
      <AddRecipeForm fetchRecipes={fetchRecipes} />
      <div className='grid-container'>
        {recipes.map((recipe) => (
          <div key={recipe.id} className='grid-item'>
            {' '}
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions}</p>
            <button onClick={() => handleRecipeClick(recipe)}>
              View Details
            </button>
          </div>
        ))}
      </div>
      // Display modal with the selected recipe
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
