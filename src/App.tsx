import './App.css';
import SearchRecipe from './pages/search-recipe/SearchRecipe';
import CustomNavbar from './components/navbar/CustomNavbar';
import Grid from './components/grid/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';

const App = () => {
  return (
    <Router>
      <CustomNavbar
        onSearch={(query) => console.log('Searching for:', query)}
      />
      <div className='app'>
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
