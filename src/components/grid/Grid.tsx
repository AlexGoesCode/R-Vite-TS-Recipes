import React, { useState, useEffect } from 'react';
import './Grid.css';
import { API_KEY } from '../../assets/secret/secret';


interface Recipe {
  id: number;
  title: string;
  image: string;
}

const Grid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Manage the search query state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Manage the fetched recipes
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState<string | null>(null); // Manage error state


  const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

   // Event handler for typing in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // updates the state with new query)
  }


    // Fetch recipes from Spoonacular API based on the search query
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      setError(null);
      fetch(`${API_URL}&query=${searchQuery}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setRecipes(data.results);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
          setError('Failed to fetch recipes. Please try again.');
          setLoading(false);
        });
    }
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
        {recipes.map(recipe => (
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