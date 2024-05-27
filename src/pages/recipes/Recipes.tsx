import { useState, useEffect } from 'react';
import { API_KEY } from '../../assets/secret/secret';
import CharactersGrid from '../../components/characters-grid/CharactersGrid';
import './Recipes.css';

interface Recipe {
  id: number;
  title: string;
  image: string;
  cuisine: string;
  diet: string;
  name: string;
  type: string;
}

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [resultsDisplayed, setResultsDisplayed] = useState(false); // State to track if results are displayed

  const API_URL = `https://api.spoonacular.com/recipes/complexSearch`;

  const getRecipes = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?apiKey=${API_KEY}&query=${query}&number=10`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data.results);
      setResultsDisplayed(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again.');
      setResultsDisplayed(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.trim().toLowerCase()); // Update the state with the new query
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      getRecipes(searchQuery);
    }
  };

  useEffect(() => {
    // Optionally, fetch some initial recipes on mount
    getRecipes('');
    return () => {
      const root = document.getElementById('root');
      root?.classList.remove('dim');
    };
  }, []);

  return (
    <div
      className={`search-recipe-container ${
        resultsDisplayed ? 'dim-background' : ''
      }`}
    >
      <div className='searchContainer'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='Search for recipes...'
        />
        <button onClick={handleSearchClick}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <CharactersGrid characters={recipes} />
      </div>
    </div>
  );
};

export default Recipes;
