import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

interface AddRecipeFormProps {
  fetchRecipes: () => void;
  title: string;
  setTitle: (title: string) => void;
  ingredients: string;
  setIngredients: (ingredients: string) => void;
  image: string;
  setImage: (image: string) => void;
  author: string;
  setAuthor: (author: string) => void;
  instructions: string;
  setInstructions: (instructions: string) => void;
}

const AddRecipeForm = ({
  fetchRecipes,
  title,
  setTitle,
  author,
  setImage,
  ingredients,
  setAuthor,
  setIngredients,
  image,
  instructions,
  setInstructions,
}: AddRecipeFormProps) => {
  // const [title, setTitle] = useState('');
  // const [ingredients, setIngredients] = useState('');
  // const [instructions, setInstructions] = useState('');
  // const [image, setImage] = useState('');
  // const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
      fetchRecipes(); // Fetch updated list of recipes after adding a new one
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default AddRecipeForm;
