import { useState, useEffect } from 'react';

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

  const getRecipes = async () => {
    try {
      const response = await fetch(
        'https://api.spoonacular.com/recipes/complexSearch'
      );
      if (!response.ok) {
        throw new Error('...something went wrong...');
      }
      const data = await response.json();
      setRecipes(data.results);

      console.log('data :>> ', data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      {recipes &&
        recipes.map((recipe) => <div key={recipe.id}>{recipe.name}</div>)}
    </div>
  );
};

export default SearchRecipe;
