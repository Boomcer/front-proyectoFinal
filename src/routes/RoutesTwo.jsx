import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutScreen from '../views/AboutScreen';
import ErrorScreen from "../views/ErrorScreen";
import ProtectedRoutes from './ProtectedRoutes';
import LoginScreen from '../views/LoginScreen';
import HomeScreen from '../views/HomeScreen';
import AdministradorScreen from '../views/AdministradorScreen';
import ProductScreen from '../views/ProductScreen';
import CarritoScreen from '../views/carritoScreen';
import FavoritosScreen from '../views/FavoritosScreen';
import RegistroScreen from '../views/RegistroScreen';
import CategoriasScreen from '../views/CategoriasScreen'


const RoutesTwo = ()=>{

  return(
<>
    <Routes>
      <Route path="/" element={<HomeScreen/>}/>
      <Route path="/nosotros" element={<AboutScreen/>}/>
      <Route path="/categorias" element={<CategoriasScreen/>}/>
      <Route path="/producto/:id" element={<ProductScreen/>}/>
      <Route path="/carrito" element={<CarritoScreen/>}/>      
      <Route path="/favoritos" element= {<FavoritosScreen/>}/>
      <Route path="/login" element= {<LoginScreen/>}/>
      <Route path="/registro" element= {<RegistroScreen/>}/>

      <Route 
        path='/admin' 
        element={
        <ProtectedRoutes>
        <AdministradorScreen/>
        </ProtectedRoutes>
        }/>
      <Route path="*" element={<ErrorScreen/>}/>
    </Routes>
</>
);
};

export default RoutesTwo;

