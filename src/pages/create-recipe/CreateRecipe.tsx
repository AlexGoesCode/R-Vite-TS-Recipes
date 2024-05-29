import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import './CreateRecipe.css';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');

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
      alert('Recipe added successfully!');
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

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
        <button type='submit'>Add Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
