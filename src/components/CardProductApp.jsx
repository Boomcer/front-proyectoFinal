import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import "./CardProductApp.css";
import { Link, NavLink } from "react-router-dom";
 
const CardProductApp = ({producto}) => {

  return (
    <div className="col">
      <Link className="nav-link" to={`/producto/${producto.id}`}>
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
              <button href="#" className="btn btn-outline-secondary">Añadir a carrito</button>
            </div>         
            <div style={{fontSize:"2em", color:"#e0e0e0"}}>
              <FontAwesomeIcon icon={faHeart}/>
            </div>
            
          </div>
          </div>
        </div>
        </Link> 
    </div>
  );
};

export default CardProductApp