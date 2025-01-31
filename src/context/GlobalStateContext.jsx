import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const GlobalStateContext = createContext();

// Proveedor del contexto
export const GlobalStateProvider = ({ children }) => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Función para cargar los valores iniciales desde localStorage
  const loadCounts = () => {
    const favorites = JSON.parse(localStorage.getItem('favoritos')) || [];
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    setFavoritesCount(favorites.length);
    setCartCount(cart.length);
  };

  // Cargar valores al montar el componente
  useEffect(() => {
    loadCounts();

    // Escuchar cambios en localStorage en caso de modificaciones externas
    const handleStorageChange = () => {
      loadCounts();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Función para actualizar favoritos y guardar en localStorage
  const updateFavorites = (newFavorites) => {
    localStorage.setItem('favoritos', JSON.stringify(newFavorites));
    setFavoritesCount(newFavorites.length);
  };

  // Función para actualizar carrito y guardar en localStorage
  const updateCart = (newCart) => {
    localStorage.setItem('carrito', JSON.stringify(newCart));
    setCartCount(newCart.length);
  };

  return (
    <GlobalStateContext.Provider
      value={{ favoritesCount, cartCount, updateFavorites, updateCart }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook para acceder al contexto
export const useGlobalState = () => useContext(GlobalStateContext);
