import { useEffect, useState } from 'react';
import './Recipes.css';
import { API_KEY } from '../../assets/secret/secret';
import SearchBar from '../../components/search-bar/SearchBar';
import RecipeList from '../../components/recipe-list/RecipeList';
import RecipeModal from '../../components/recipe-modal/RecipeModal';

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

type Character = {
  id: string;
  title: string;
  image: string;
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
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // Manage selected recipe

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
      const detailedRecipes = await Promise.all(
        data.results.map(async (recipe: any) => {
          const detailsResponse = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
          );
          if (!detailsResponse.ok) {
            throw new Error('Failed to fetch recipe details');
          }
          const details = await detailsResponse.json();
          return {
            id: details.id.toString(),
            title: details.title,
            cuisine: details.cuisines.join(', '),
            diet: details.diets.join(', '),
            name: details.name,
            image: details.image,
            type: details.dishTypes.join(', '),
            ingredients: details.extendedIngredients.map(
              (ingredient: any) => ingredient.original
            ),
            instructions: details.instructions,
            author: details.sourceName,
          };
        })
      );
      setTotalPages(Math.ceil(data.totalResults / 3)); // Assuming the API provides totalResults
      return detailedRecipes;
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

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCharacterClick = (character: Character) => {
    const recipe = recipes.find((r) => r.id === character.id);
    if (recipe) {
      handleRecipeClick(recipe);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    // Logic to edit the recipe
    console.log('Edit recipe:', recipe);
  };

  const handleDeleteRecipe = (id: string) => {
    // Logic to delete the recipe
    console.log('Delete recipe with id:', id);
  };

  // Convert recipes to characters
  const characters: Character[] = recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
  }));

  return (
    <div className='container'>
      <div
        className={`container searchContainer ${
          resultsDisplayed ? 'results-displayed' : ''
        }`}
      ></div>
      <SearchBar
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        selectedDiet={selectedDiet}
        handleDietChange={handleDietChange}
        handleSearchClick={handleSearchClick}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {resultsDisplayed && (
        <RecipeList
          characters={characters}
          onCharacterClick={handleCharacterClick}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
      <RecipeModal
        showModal={showModal}
        selectedRecipe={selectedRecipe}
        handleCloseModal={handleCloseModal}
        handleEditRecipe={handleEditRecipe}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </div>
  );
};

export default Recipes;
