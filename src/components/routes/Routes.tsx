import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import Logout from '../../pages/logout/Logout';
import SignUp from '../../pages/sign-up/SignUp';
import NotFound from '../../pages/not-found/NotFound';
import Recipes from '../../pages/recipes/Recipes';
import ProtectedRoute from '../protected-route/ProtectedRoute';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/signup' element={<SignUp />} />
      <Route
        path='/recipes'
        element={
          <ProtectedRoute>
            <Recipes />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
