import { useEffect, useState } from 'react';
import './Recipes.css';
import { API_KEY } from '../../assets/secret/secret';
import CharactersGrid from '../../components/characters-grid/CharactersGrid';

type Recipe = {
  id: number;
  title: string;
  cuisine: string;
  diet: string;
  name: string;
  image: string;
  type: string;
};

const Grid = () => {
  const [inputValue, setInputValue] = useState(''); // Manage the input value
  const [searchQuery, setSearchQuery] = useState(''); // Manage the search query state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [resultsDisplayed, setResultsDisplayed] = useState(false); // State to track if results are displayed

  const API_URL = `https://api.spoonacular.com/recipes/complexSearch`;

  // Event handler for typing in the search input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim().toLowerCase()); // updates the state with new query, normalizes user input
  };

  // Event handler for clicking the search button
  const handleSearchClick = async () => {
    setSearchQuery(inputValue);
    if (inputValue) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}?apiKey=${API_KEY}&query=${inputValue}&number=3`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data.results);
        setResultsDisplayed(true);
        const root = document.getElementById('root');
        root?.classList.add('dim');
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again.');
        setResultsDisplayed(false);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter the recipes based on the search query and limit to 10 results
  const filteredRecipes = recipes
    .filter((recipe) => recipe.title.toLowerCase().includes(searchQuery))
    .slice(0, 3);

  // Log the filtered recipes to the console
  console.log('Filtered Recipes:', filteredRecipes);

  useEffect(() => {
    return () => {
      const root = document.getElementById('root');
      root?.classList.remove('dim');
    };
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
          <CharactersGrid characters={filteredRecipes} />
        </div>
      )}
    </div>
  );
};

export default Grid;
