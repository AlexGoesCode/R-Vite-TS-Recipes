import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import './CreateRecipe.css';

type Recipe = {
  id: string;
  title: string;
  cuisine?: string;
  diet?: string;
  name: string;
  image: string;
  type?: string;
  ingredients: string[];
  instructions: string;
  author: string;
};

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [createdRecipes, setCreatedRecipes] = useState<Recipe[]>([]); // Manage created recipes
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null); // Manage the recipe being edited
  const [resultsDisplayed, setResultsDisplayed] = useState(false); // State to track if results are displayed

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingRecipe) {
        await updateDoc(doc(db, 'recipes', editingRecipe.id), {
          title,
          ingredients: ingredients.split(','),
          instructions,
          image,
          author,
        });
        alert('Recipe updated successfully!');
        setEditingRecipe(null);
      } else {
        await addDoc(collection(db, 'recipes'), {
          title,
          ingredients: ingredients.split(','),
          instructions,
          image,
          author,
        });
        alert('Recipe added successfully!');
      }
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage('');
      setAuthor('');
      fetchCreatedRecipes(); // Fetch updated list of created recipes
      setResultsDisplayed(true); // Display results
      const root = document.getElementById('root');
      root?.classList.add('dim');
    } catch (err) {
      console.error('Error adding/updating document: ', err);
    }
  };

  const fetchCreatedRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];
      setCreatedRecipes(recipesList);
      console.log('Fetched Created Recipes:', recipesList);
    } catch (err) {
      console.error('Error fetching created recipes:', err);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients.join(','));
    setInstructions(recipe.instructions);
    setImage(recipe.image);
    setAuthor(recipe.author);
    setEditingRecipe(recipe);
  };

  useEffect(() => {
    fetchCreatedRecipes();
    return () => {
      const root = document.getElementById('root');
      root?.classList.remove('dim');
    };
  }, []);

  return (
    <div className='container'>
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
        <button type='submit'>Add Recipe</button>
      </form>
      {resultsDisplayed && (
        <div className='grid-container'>
          {createdRecipes.map((recipe) => (
            <div key={recipe.id} className='grid-item'>
              <h3>{recipe.title}</h3>
              <p>{recipe.instructions}</p>
              <img src={recipe.image} alt={recipe.title} width='100' />
              <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;
