import React, { createContext, useState, useContext, useEffect } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const loadCounts = () => {
    const favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    setFavoritesCount(favorites.length);
    setCartCount(cart.length);
  };

  useEffect(() => {
    loadCounts();

    const handleStorageChange = () => {
      loadCounts();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  const updateFavorites = (newFavorites) => {
    localStorage.setItem("favoritos", JSON.stringify(newFavorites));
    setFavoritesCount(newFavorites.length);
  };


  const updateCart = (newCart) => {
    localStorage.setItem("carrito", JSON.stringify(newCart));
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

export const useGlobalState = () => useContext(GlobalStateContext);
