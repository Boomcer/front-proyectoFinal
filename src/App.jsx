import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './css/general.css'
import LoginScreen from './views/LoginScreen'
import RoutesTwo from './routes/RoutesTwo'


function App() {

  return (
    <BrowserRouter>
      <div className='w-100'>
      <Routes>
        <Route path='/*' element={<RoutesTwo/>}/>
        <Route path='/login' element={<LoginScreen/>}/>

      </Routes>
      </div>
    </BrowserRouter>
  )
};
export default App
