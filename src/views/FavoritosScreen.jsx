import React, { useEffect, useState } from "react";
import { getProducto } from "../helpers/apiProductos";
import { getUsuario, deleteToFavoritos } from "../helpers/apiUsuarios";
import CardFavoritos from "../components/CardFavoritos";

const FavoritosScreen = () => {
  const [favoritos, setFavoritos] = useState([]);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const usuario = await getUsuario(uid);
        const favoritosList = usuario.usuario.favoritos || [];

        const productosFavoritos = await Promise.all(
          favoritosList.map(async (fav) => {
            const producto = await getProducto(fav.productoId);
            return { ...producto, favoritoId: fav._id };
          })
        );

        setFavoritos(productosFavoritos);
      } catch (error) {
        console.error("Error al obtener los favoritos o productos:", error);
      }
    };
    fetchFavoritos();
  }, [uid]);

  const handleDeleteFavorito = async (favoritoId) => {
    try {
      await deleteToFavoritos(favoritoId);
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((favorito) => favorito.favoritoId !== favoritoId)
      );

      const favoritos = JSON.parse(localStorage.getItem("favoritos"));
      const nuevoFavoritos = favoritos.filter(
        (favorito) => favorito._id !== favoritoId
      );
      localStorage.setItem("favoritos", JSON.stringify(nuevoFavoritos));
    } catch (error) {
      console.error("Error al eliminar el favorito:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h1>Favoritos</h1>
      {favoritos.length === 0 ? (
        <div className="alert alert-info text-center w-100">
          No hay productos favoritos almacenados
        </div>
      ) : (
        <div className="row g-2 w-100 d-flex">
          {favoritos.map((favorito) => (
            <CardFavoritos
              key={favorito.favoritoId}
              id={favorito.favoritoId}
              producto={favorito.producto}
              onDeleteFavorito={handleDeleteFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritosScreen;
