import React from "react";
import { useState, useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import "./CardProductApp.css";
import { Link, NavLink } from "react-router-dom";
import { updateFavoritos, getUserById , getUsuario} from '../helpers/favoritosApi'; // Funciones API


 
const CardProductApp = ({producto}) => {

  const [favoritos, setFavoritos] = useState([]);
  const uid = localStorage.getItem('uid');
  

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(); // Obtener usuario desde la API
      setFavoritos(user.favoritos);
    };
    fetchUser();
  }, [uid]);

  const toggleFavorito = async () => {
    const updatedFavoritos = favoritos.includes(producto._id)
      ? favoritos.filter((id) => id !== producto._id)
      : [...favoritos, producto._id];

    setFavoritos(updatedFavoritos);
    await updateFavoritos(uid, updatedFavoritos); // Actualizar en el backend
  };

  return (
    <div className="col">
      
      <div id="card" className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark">
        <div id="content-img" className="align-items-center">
          <img 
          src={producto.img} 
          className="card-img-top" 
          alt={producto.nombre}
          />
        </div>
          <div className="card-body text-light">
          <h6 className="card-title">{producto.nombre}</h6>
          <p className="card-text">$ {producto.precio}</p>
          <div className="d-flex align-items-center justify-content-around">
            <div>
             <button to={`/producto/${producto._id}`} className="btn btn-outline-secondary">Añadir a carrito</button>
            </div>         
            <div style={{fontSize:"2em", color:"#e0e0e0"}}>
              <button onClick={toggleFavorito}><FontAwesomeIcon icon={faHeart}         style={{ color: favoritos.includes(producto._id) ? 'red' : 'gray', cursor: 'pointer' }}
              /></button>
            </div>
            
          </div>
          </div>
        </div>
        
    </div>
  );
};

export default CardProductApp