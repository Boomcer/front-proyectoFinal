import React from "react";
import DestacadosApp from "../components/DestacadosApp";
import CardsProductApp from "../components/CardsProductApp";
import Page from "../components/CardPage";
import Categories from "../components/CardCategori";
import Publicidad from "../components/publicidad";
// import BuscarProductos from '../components/BuscarProductos'


const HomeScreen = () => {
  return (
    <div className="container">
            {/* <BuscarProductos /> */}

      {/* titulo */}
      {/* carrusel */}
      <DestacadosApp />
      <Categories />
      <CardsProductApp />
      <Page />
      <Publicidad />
      {/* grillas de productos */}
    </div>
  );
};

export default HomeScreen;
