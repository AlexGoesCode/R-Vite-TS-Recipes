import { useEffect, useState } from 'react';
import './Recipes.css';
import { API_KEY } from '../../assets/secret/secret';
import CharactersGrid from '../../components/characters-grid/CharactersGrid';
import Pagination from 'react-bootstrap/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1); // Manage current page
  const [totalPages, setTotalPages] = useState(1); // Manage total pages
  const [selectedDiet, setSelectedDiet] = useState(''); // Manage selected diet

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim().toLowerCase());
  };

  const handleDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiet(event.target.value);
  };

  const fetchRecipesFromAPI = async (
    query: string,
    diet: string,
    page: number = 1
  ) => {
    const API_URL = `https://api.spoonacular.com/recipes/complexSearch`;
    try {
      const response = await fetch(
        `${API_URL}?apiKey=${API_KEY}&query=${query}&diet=${diet}&number=3&offset=${
          (page - 1) * 3
        }`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTotalPages(Math.ceil(data.totalResults / 3)); // Assuming the API provides totalResults
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

  const fetchRecipes = async (query: string, page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const apiRecipes = await fetchRecipesFromAPI(query, selectedDiet, page);
      setRecipes(apiRecipes);
      setResultsDisplayed(true);
      const root = document.getElementById('root');
      root?.classList.add('dim');
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
    setCurrentPage(1);
    if (inputValue) {
      fetchRecipes(inputValue, 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchRecipes(searchQuery, page);
  };

  useEffect(() => {
    return () => {
      const root = document.getElementById('root');
      root?.classList.remove('dim');
    };
  }, []);

  const getPaginationItems = () => {
    const items = [];
    const maxPageItems = 5;
    const halfPageItems = Math.floor(maxPageItems / 2);
    let startPage = Math.max(1, currentPage - halfPageItems);
    let endPage = Math.min(totalPages, currentPage + halfPageItems);

    if (currentPage - halfPageItems <= 0) {
      endPage = Math.min(
        totalPages,
        endPage + (halfPageItems - currentPage + 1)
      );
    }

    if (currentPage + halfPageItems > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfPageItems - totalPages)
      );
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div className='container'>
      <div
        className={`container searchContainer ${
          resultsDisplayed ? 'results-displayed' : ''
        }`}
      ></div>
      <select
        className='filterSelect'
        value={selectedDiet}
        onChange={handleDietChange}
      >
        <option value=''>All Diets</option>
        <option value='gluten free'>Gluten Free</option>
        <option value='ketogenic'>Ketogenic</option>
        <option value='vegetarian'>Vegetarian</option>
        <option value='vegan'>Vegan</option>
        <option value='pescatarian'>Pescatarian</option>
        <option value='paleo'>Paleo</option>
        <option value='primal'>Primal</option>
        <option value='whole30'>Whole30</option>
      </select>
      <input
        className='searchInput'
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
        <>
          <div className='grid-container'>
            <CharactersGrid characters={recipes} />
          </div>
          {totalPages > 1 && (
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {getPaginationItems()}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Recipes;
