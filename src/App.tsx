import { useState } from 'react'
import './App.css'
import SearchRecipe from './pages/SearchRecipe'
import  NavScrollExample from './components/Navbar'

function App() {

  return (
    <>
    <NavScrollExample />
    <h1>Recipes</h1>
    <SearchRecipe />
    </>
  )
}

export default App
