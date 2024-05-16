import React from 'react';
import './App.css';
import SearchRecipe from './pages/SearchRecipe';
import NavScrollExample from './components/navbar/Navbar';
import Grid from './components/grid/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavScrollExample />
        <h1>Recipes</h1>
        <Routes>
          <Route path="/" element={<Grid />} />
          <Route path="/search" element={<SearchRecipe />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;