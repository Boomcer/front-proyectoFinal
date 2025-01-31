import React from "react";
import DestacadosApp from "../components/DestacadosApp";
import CardsProductApp from "../components/CardsProductApp";
import Page from "../components/CardPage";
import Categories from "../components/CardCategori";
import Publicidad from "../components/publicidad";



const HomeScreen = () => {

  return (
    <div className="container">
      <DestacadosApp />
      <Categories />
      <CardsProductApp />
      <Page />
      <Publicidad />
    </div>
  );
};

export default HomeScreen;
