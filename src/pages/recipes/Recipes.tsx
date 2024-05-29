import { useEffect, useState } from 'react';
import './Recipes.css';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import CharactersGrid from '../../components/characters-grid/CharactersGrid';
import { API_KEY } from '../../assets/secret/secret';

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

const Recipes = () => {
  const [inputValue, setInputValue] = useState(''); // Manage the input value
  const [searchQuery, setSearchQuery] = useState(''); // Manage the search query state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [resultsDisplayed, setResultsDisplayed] = useState(false); // State to track if results are displayed

  // Form states
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim().toLowerCase());
  };

  const fetchRecipesFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];
      return recipesList;
    } catch (err) {
      console.error('Error fetching recipes from Firestore:', err);
      setError('Failed to fetch recipes. Please try again.');
      return [];
    }
  };

  const fetchRecipesFromAPI = async (query: string) => {
    const API_URL = `https://api.spoonacular.com/recipes/complexSearch`;
    try {
      const response = await fetch(
        `${API_URL}?apiKey=${API_KEY}&query=${query}&number=3`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results.map((recipe: any) => ({
        id: recipe.id.toString(),
        title: recipe.title,
        cuisine: recipe.cuisine,
        diet: recipe.diet,
        name: recipe.name,
        image: recipe.image,
        type: recipe.type,
        ingredients: [],
        instructions: '',
        author: '',
      }));
    } catch (err) {
      console.error('Error fetching recipes from API:', err);
      setError('Failed to fetch recipes from API. Please try again.');
      return [];
    }
  };

  const fetchRecipes = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const [firestoreRecipes, apiRecipes] = await Promise.all([
        fetchRecipesFromFirestore(),
        fetchRecipesFromAPI(query),
      ]);
      const combinedRecipes = [...firestoreRecipes, ...apiRecipes];
      setRecipes(combinedRecipes);
      setResultsDisplayed(true);
      console.log('Fetched Recipes:', combinedRecipes);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes. Please try again.');
      setResultsDisplayed(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue);
    if (inputValue) {
      fetchRecipes(inputValue);
    }
  };

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
      fetchRecipes(''); // Fetch updated list of recipes
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  useEffect(() => {
    fetchRecipes('');
  }, []);

  return (
    <div className='container'>
      <div
        className={`container searchContainer ${
          resultsDisplayed ? 'results-displayed' : ''
        }`}
      ></div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Search for recipes...'
      />
      <button className='searchButton' onClick={handleSearchClick}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {resultsDisplayed && (
        <div className='grid-container'>
          <CharactersGrid characters={recipes} />
        </div>
      )}

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

export default Recipes;
