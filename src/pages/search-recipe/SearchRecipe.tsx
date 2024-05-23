import { useState, useEffect } from 'react';
import { API_KEY } from '../../assets/secret/secret';
import './SearchRecipe.css';
import backgroundPic from '../../assets/pictures/background_pic.jpg';

type Recipes = {
  id: number;
  cuisine: string;
  diet: string;
  name: string;
  image: string;
  type: string;
};

const SearchRecipe = () => {
  const [recipes, setRecipes] = useState<Recipes[] | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [resultsDisplayed, setResultsDisplayed] = useState(false); // State to track if results are displayed

  const getRecipes = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('...something went wrong...');
      }
      const data = await response.json();
      setRecipes(data.results);
      setResultsDisplayed(true);

      console.log('data :>> ', data);
      console.log('resultsDisplayed set to true');
    } catch (error) {
      console.log('error :>> ', error);
      setError('Failed to fetch recipes. Please try again.');
      setResultsDisplayed(false);
      console.log('resultsDisplayed set to false');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update the state with the new query
  }; // Handler for input change events

  const handleSearchClick = () => {
    if (searchQuery) {
      getRecipes(searchQuery);
    } // Handler for search button click events
  };

  useEffect(() => {
    // Optionally, fetch some initial recipes on mount
    getRecipes('');
  }, []);

  console.log('resultsDisplayed:', resultsDisplayed);

  return (
    <div
      className={`search-recipe-container ${
        resultsDisplayed ? 'dim-background' : ''
      }`}
      style={{ backgroundImage: `url(${backgroundPic})` }}
    >
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search for recipes...'
      />
      <button onClick={handleSearchClick}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <p>Diet: {recipe.diet}</p>
            <img src={recipe.image} alt={recipe.name} width='100' />
          </div>
        ))}
    </div>
  );
};

export default SearchRecipe;
