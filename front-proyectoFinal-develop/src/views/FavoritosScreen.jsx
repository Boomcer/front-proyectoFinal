import React, { useEffect, useState } from 'react';
import CardProductApp from '../components/CardProductApp';
import { getUserById } from '../helpers/favoritosApi';

const FavoritesView = () => {
  const [favoritos, setFavoritos] = useState([]);
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    const fetchFavoritos = async () => {
      const user = await getUserById(uid);
      setFavoritos(user.favoritos);
    };
    fetchFavoritos();
  }, [uid]);

  return (
    <div>
      {favoritos.map((productoId) => (
        <CardProductApp key={productoId} producto={{ _id: productoId }} />
      ))}
    </div>
  );
};

export default FavoritesView;
