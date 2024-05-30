import { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import './CreateRecipe.css';

type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  author: string;
};

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const recipeDoc = doc(db, 'recipes', editingId);
        await updateDoc(recipeDoc, {
          title,
          ingredients: ingredients.split(','),
          instructions,
          image,
          author,
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'recipes'), {
          title,
          ingredients: ingredients.split(','),
          instructions,
          image,
          author,
        });
      }
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage('');
      setAuthor('');
      fetchRecipes(); // Fetch updated list of recipes after adding/editing
      alert('Recipe added/edited successfully!');
    } catch (err) {
      console.error('Error adding/editing document: ', err);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
      fetchRecipes(); // Fetch updated list of recipes after deleting one
      alert('Recipe deleted successfully!');
    } catch (err) {
      console.error('Error deleting document: ', err);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients.join(','));
    setInstructions(recipe.instructions);
    setImage(recipe.image);
    setAuthor(recipe.author);
    setEditingId(recipe.id);
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes on component mount
  }, []);

  return (
    <div className='create-recipe-container'>
      <h2>Create Recipe</h2>
      <form onSubmit={handleAddRecipe} className='add-recipe-form'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Ingredients (comma separated)'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <input
          type='text'
          placeholder='Instructions'
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <input
          type='text'
          placeholder='Image URL'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type='text'
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type='submit'>
          {editingId ? 'Edit Recipe' : 'Add Recipe'}
        </button>
      </form>

      <div className='grid-container'>
        {recipes.map((recipe) => (
          <div key={recipe.id} className='grid-item'>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions}</p>
            <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
            <button onClick={() => handleDeleteRecipe(recipe.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateRecipe;
