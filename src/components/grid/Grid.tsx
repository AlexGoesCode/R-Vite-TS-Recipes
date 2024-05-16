import React, { useState, useEffect } from 'react';
import './Grid.css';
import { API_KEY } from '../../assets/secret/secret';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const Grid: React.FC = () => { // Functional Component
  const [searchQuery, setSearchQuery] = useState(''); // Manage the search query state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state

  const API_URL = `https://api.spoonacular.com/recipes/complexSearch`;

  // Debounce to limit number of API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutID: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Event handler for typing in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.trim().toLowerCase()); // updates the state with new query, normalizes user input
  };

  // Fetch recipes from Spoonacular API based on the search query
  useEffect(() => {
    const fetchRecipes = debounce(async () => {
      if (searchQuery) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${API_URL}?apiKey=${API_KEY}&query=${searchQuery}`);
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
    }, 500);

    fetchRecipes();
  }, [searchQuery]);

  return (
    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search for recipes...'
      />
      <button onClick={() => console.log('Search button clicked. Current search query:', searchQuery)}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid-container">
        {recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery)) // Normalize database values
          .map(recipe => (
            <div key={recipe.id} className="grid-item">
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Grid;
