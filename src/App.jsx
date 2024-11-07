import { useState } from 'react'
import Home from './views/homeScrenn'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './css/general.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
