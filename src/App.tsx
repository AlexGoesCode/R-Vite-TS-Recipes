import './App.css';
import SearchRecipe from './pages/search-recipe/SearchRecipe';
import CustomNavbar from './components/navbar/CustomNavbar';
import Grid from './components/grid/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import SignUp from './pages/sign-up/SignUp';

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recipes' element={<Grid />} />
          <Route path='search' element={<SearchRecipe />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
