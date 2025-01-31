import React, { useEffect, useState } from 'react';
import { getProducto } from '../helpers/apiProductos'; // Cambiado a singular
import { getUsuario, deleteToFavoritos } from '../helpers/apiUsuarios';
import CardFavoritos from '../components/CardFavoritos';

const FavoritosScreen = () => {
  const [favoritos, setFavoritos] = useState([]); // Lista de favoritos con sus IDs
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        // Traemos los datos del usuario, incluyendo los favoritos
        const usuario = await getUsuario(uid);
        const favoritosList = usuario.usuario.favoritos || []; // Array de favoritos del backend
        
        console.log('Lista de favoritos del usuario:', favoritosList);

        // Obtener los detalles de los productos favoritos
        const productosFavoritos = await Promise.all(
          favoritosList.map(async (fav) => {
            const producto = await getProducto(fav.productoId); // Detalles del producto
            return { ...producto, favoritoId: fav._id }; // Incluimos el ID único del favorito
          })
        );
        console.log('Productos favoritos obtenidos:', productosFavoritos);
        setFavoritos(productosFavoritos); // Guardar en el estado
      } catch (error) {
        console.error('Error al obtener los favoritos o productos:', error);
      }
    };
    fetchFavoritos();
  }, [uid]);

  const handleDeleteFavorito = async (favoritoId) => {
    try {
      console.log('ID del favorito a eliminar:', favoritoId);
      await deleteToFavoritos(favoritoId); // Llamar a la función de eliminación
      setFavoritos((prevFavoritos) =>
        
          prevFavoritos.filter((favorito) => favorito.favoritoId !== favoritoId)
        ); // Actualizar la lista localmente
        
        const favoritos = JSON.parse(localStorage.getItem('favoritos'));
        const nuevoFavoritos = favoritos.filter((favorito) => favorito._id !== favoritoId);
        localStorage.setItem('favoritos', JSON.stringify(nuevoFavoritos));
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
            key={favorito.favoritoId} // Usar el ID único del favorito como clave
            id={favorito.favoritoId} // Pasar el ID del favorito
            producto={favorito.producto} // Pasar el producto completo
            onDeleteFavorito={handleDeleteFavorito} // Pasar la función de eliminación
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritosScreen;
