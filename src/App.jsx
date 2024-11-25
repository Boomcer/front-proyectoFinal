import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './css/general.css'
import RoutesTwo from './routes/RoutesTwo'
import MenuApp from './components/MenuApp'
import ProtectedRoutes from './routes/ProtectedRoutes'
//import LoginScreen from './views/LoginScreen'
import AboutScreen from './views/AboutScreen'
import LoginScreen from './views/LoginScreen'

function App() {

  return (
    <BrowserRouter>
      <MenuApp/>
      <div className='w-100'>
      <Routes>
        <Route 
        path='/*' 
        element={
        <RoutesTwo/>
         }/>
      </Routes>
      </div>
    </BrowserRouter>
  )
};
export default App
