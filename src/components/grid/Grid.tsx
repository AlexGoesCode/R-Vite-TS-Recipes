import { useState } from 'react';
import './Grid.css';
import { API_KEY } from '../../assets/secret/secret';
import CharactersGrid from '../CharactersGrid/CharactersGrid';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const Grid = () => {
  const [inputValue, setInputValue] = useState(''); // Manage the input value
  const [searchQuery, setSearchQuery] = useState(''); // Manage the search query state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state

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
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again.');
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

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Search for recipes...'
      />
      <button onClick={handleSearchClick}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <CharactersGrid characters={filteredRecipes} />
    </div>
  );
};

export default Grid;
