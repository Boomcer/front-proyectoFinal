import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutScreen from '../views/AboutScreen';
import ErrorScreen from "../views/ErrorScreen";
import MenuApp from '../components/MenuApp';
import ProtectedRoutes from './ProtectedRoutes';
import LoginScreen from '../views/LoginScreen';
import HomeScreen from '../views/homeScreen';
import AdministradorScreen from '../views/administradorScreen';
import ProductScreen from '../views/productScreen';
import CarritoScreen from '../views/carritoScreen';

const RoutesTwo = ()=>{

  return(
<>
    <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/nosotros" element={<AboutScreen/>}/>
      <Route path="/producto/id" element={<ProductScreen/>}/>
      <Route path="/carrito" element={<CarritoScreen/>}/>      
      <Route path="/admin" element= {<AdministradorScreen/>}/>
      <Route path="*" element={<ErrorScreen/>}/>
    </Routes>
</>
);
};

export default RoutesTwo;

