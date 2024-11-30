import { useState } from 'react'
import Footer from './components/Footer'
import Home from './views/homeScrenn'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './css/general.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <div className="footer">
      <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App
