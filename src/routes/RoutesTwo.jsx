import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutScreen from '../views/AboutScreen';
import ErrorScreen from "../views/ErrorScreen";
import MenuApp from '../components/MenuApp';
import ProtectedRoutes from './ProtectedRoutes';
import LoginScreen from '../views/LoginScreen';
import HomeScreen from '../views/HomeScreen';
import AdministradorScreen from '../views/AdministradorScreen';


const RoutesTwo = ()=>{

  return(
<>
    <MenuApp />
    <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/nosotros" element={<AboutScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/error" element={<ErrorScreen/>}/>      
      
      <Route 
        path="/admin" 
        element= {
        <ProtectedRoutes>  
        <AdministradorScreen/>
        </ProtectedRoutes>
        }
        />
      <Route path="*" element={<ErrorScreen/>}/>
    </Routes>
</>
);
};

export default RoutesTwo;

