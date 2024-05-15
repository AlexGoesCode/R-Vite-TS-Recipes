import { useState } from 'react'
import './App.css'
import SearchRecipe from './pages/SearchRecipe'
import  NavScrollExample from './components/Navbar'
import Grid from './components/grid'

function App() {

  return (
    <>
    <NavScrollExample />
    <h1>Recipes</h1>
    <SearchRecipe />
    <Grid />
    </>
  )
}

export default App
