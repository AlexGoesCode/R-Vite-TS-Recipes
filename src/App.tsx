import './App.css';
import SearchRecipe from './pages/search-recipe/SearchRecipe';
import CustomNavbar from './components/navbar/CustomNavbar';
import Grid from './components/grid/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/not-found/NotFound';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <CustomNavbar
          onSearch={(query) => console.log('Searching for:', query)}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recipes' element={<Grid />} />
          <Route path='search' element={<SearchRecipe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
