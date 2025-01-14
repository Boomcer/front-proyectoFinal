import React, { useEffect, useState } from 'react';
import { getProducto } from '../helpers/apiProductos'; // Cambiado a singular
import { getUsuario, deleteToFavoritos } from '../helpers/apiUsuarios';
import CardFavoritos from '../components/CardFavoritos';
const FavoritosScreen = () => {
  const [favoritos, setFavoritos] = useState([]);
  const uid = localStorage.getItem('uid');
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        // Traemos los datos del usuario, incluyendo los favoritos
        const usuario = await getUsuario(uid);
        const favoritosIds = JSON.parse(localStorage.getItem('favoritos')) || [];
        // Arreglo de objetos con productoId
        console.log(favoritosIds);
        // Mapeamos para obtener los productos usando getProducto
        const productosFavoritos = await Promise.all(
          favoritosIds.map((fav) => getProducto(fav.productoId._id))
        );
        console.log('Productos favoritos obtenidos:', productosFavoritos);
        // Guardamos los productos obtenidos en el estado
        setFavoritos(productosFavoritos);
      } catch (error) {
        console.error('Error al obtener los favoritos o productos:', error);
      }
    };
    fetchFavoritos();
  }, [uid]);

  useEffect(() => {
    console.log(favoritos);
    
  }, [favoritos]);

  const handleDeleteFavorito = async (productoId) => {
    try {
      await deleteToFavoritos(productoId); // Eliminar el producto de favoritos en el backend
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((favorito) => favorito._id !== productoId)
      ); // Actualizar el estado local
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
    }
  };
  return (
    <div>
      <h1>Favoritos</h1>
      <div className="row g-4">
        {favoritos.map((favorito) => (
          <CardFavoritos
            key={favorito._id}
            id={favorito._id}
            producto={favorito.producto}
            onDeleteFavorito={handleDeleteFavorito}
          />
        ))}
      </div>
    </div>
  );
};
export default FavoritosScreen;