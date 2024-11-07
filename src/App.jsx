import { useState } from 'react'
import Home from './views/HomeScreen'
import Admin from './views/AdminScreen'
import About from './views/AboutScreen'
import Cart from './views/CartScreen'
import Favorite from './views/FavoriteScreen'
import Product from './views/ProductScreen'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './css/general.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/product' element ={<Product/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
