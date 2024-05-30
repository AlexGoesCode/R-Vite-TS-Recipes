import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import './CreateRecipe.css';
import CharactersGrid from '../../components/characters-grid/CharactersGrid';

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

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'recipes'), {
        title,
        ingredients: ingredients.split(','),
        instructions,
        image,
        author,
      });
      setTitle('');
      setIngredients('');
      setInstructions('');
      setImage('');
      setAuthor('');
      fetchCreatedRecipes(); // Fetch updated list of created recipes
      alert('Recipe added successfully!');
    } catch (err) {
      console.error('Error adding document: ', err);
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

  useEffect(() => {
    fetchCreatedRecipes();
  }, []);

  return (
    <div className='container'>
      <form onSubmit={handleAddRecipe} className='add-recipe-form'>
        <h2>Create a New Recipe</h2>
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

      <div className='grid-container'>
        <CharactersGrid characters={createdRecipes} />
      </div>
    </div>
  );
};

export default CreateRecipe;
