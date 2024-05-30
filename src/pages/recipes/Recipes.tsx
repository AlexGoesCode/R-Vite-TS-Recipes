import { useEffect, useState } from 'react';
import './Recipes.css';
import { API_KEY } from '../../assets/secret/secret';
import CharactersGrid from '../../components/characters-grid/CharactersGrid';

type Recipe = {
  id: string;
  title: string;
  cuisine?: string;
  diet?: string;
  name: string;
  image: string;
  type?: string;
};

const Recipes = () => {
  const [inputValue, setInputValue] = useState(''); // Manage the input value
  const [searchQuery, setSearchQuery] = useState(''); // Manage the search query state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [resultsDisplayed, setResultsDisplayed] = useState(false); // State to track if results are displayed

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim().toLowerCase());
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
      const apiRecipes = await fetchRecipesFromAPI(query);
      setRecipes(apiRecipes);
      setResultsDisplayed(true);
      console.log('Fetched Recipes:', apiRecipes);
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
    </div>
  );
};

export default Recipes;
