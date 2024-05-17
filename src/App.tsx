import React from 'react';
import './App.css';
import SearchRecipe from './pages/SearchRecipe';
import NavScrollExample from './components/navbar/Navbar';
import Grid from './components/grid/Grid';
import {
  BrowserRouter as Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='recipes' element={<Grid />} />
        <Route path='search' element={<SearchRecipe />} />
      </Route>
    )
  );

  return (
    <div>
      {/* <NavScrollExample /> */}
      <h1>Recipes</h1>
      <RouterProvider router={router} />
    </div>
  );
};

const Root = () => {
  return (
    <>
      <NavScrollExample />
      <Outlet />
    </>
  );
};
export default App;
