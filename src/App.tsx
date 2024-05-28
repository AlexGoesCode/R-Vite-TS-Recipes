import './App.css';
import CustomNavbar from './components/custom-navbar/CustomNavbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import SignUp from './pages/sign-up/SignUp';
import NotFound from './pages/not-found/NotFound';
import { AppProvider } from './context/AuthContext';
import Recipes from './pages/recipes/Recipes';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <CustomNavbar />
        <div className='app'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='recipes' element={<Recipes />} />
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
