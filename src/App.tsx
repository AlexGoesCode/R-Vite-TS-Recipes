import './App.css';
import SearchRecipe from './pages/search-recipe/SearchRecipe';
import CustomNavbar from './components/custom-navbar/CustomNavbar';
import Grid from './components/grid/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import SignUp from './pages/sign-up/SignUp';
import NotFound from './pages/not-found/NotFound';
import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
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
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
