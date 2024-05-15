import './App.css'
import SearchRecipe from './pages/SearchRecipe'
import NavScrollExample from './components/navbar/Navbar'
import Grid from './components/grid/Grid'

function App() {

  return (
    <div>
    <NavScrollExample />
    <h1>Recipes</h1>
    <Grid />
    <SearchRecipe />
    </div>
  );
};

export default App;
