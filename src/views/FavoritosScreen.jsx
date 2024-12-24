import React, { useEffect, useState } from 'react';
import { getProductos } from '../helpers/apiProductos'; // Asumí que esta función ya está definida
import { getUsuario } from '../helpers/apiUsuarios'; // Asumí que esta función ya está definida
import CardProductApp from '../components/CardProductApp';
const FavoritosScreen = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [productos, setProductos] = useState([]);
  const uid = localStorage.getItem('uid'); // Obtener el UID desde el localStorage
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        // Traemos los datos del usuario, incluyendo los favoritos
        const usuario = await getUsuario(uid);
        // Ahora tenemos los productos favoritos completos en `usuario.favoritos`, los asignamos directamente al estado favoritos
        setFavoritos(usuario.favoritos || []);
        // Si necesitas todos los productos disponibles en la tienda, puedes traerlos también
        const productos = await getProductos();
        setProductos(productos.productos); // Asegúrate de que productos.productos es un array
        console.log(productos);
      } catch (error) {
        console.error("Error al obtener los favoritos o productos:", error);
      }
    };
    fetchFavoritos();
  }, [uid]);
  return (
    <div>
      <h1>Favoritos</h1>
      <div className="row g-4">
        {productos.map((producto) => (
          <CardProductApp key={producto._id} producto={producto} />
        ))}
      </div>
    </div>
  );
};
export default FavoritosScreen;