import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import "./CardProductApp.css";
import { Link, NavLink } from "react-router-dom";
 
const CardProductApp = ({producto}) => {

  return (
    <div className="col">
      <div id="card" className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark">
        <div id="content-img" className="align-items-center">
          <Link className="nav-link" to={`/producto/${producto._id}`}>
            <img 
            src={producto.img} 
            className="card-img-top" 
            alt={producto.nombre}
            />
          </Link>
        </div>
          <div className="card-body text-light">
          <h6 className="card-title">{producto.nombre}</h6>
          <p className="card-text">$ {producto.precio}</p>
          <div className="d-flex align-items-center justify-content-around">
            <div>
              <Link className="nav-link" to={`/producto/${producto._id}`}>
                <button className="btn btn-outline-secondary">Añadir a carrito</button>
              </Link>
            </div>         
            <div style={{fontSize:"2em", color:"#e0e0e0"}}>
              <FontAwesomeIcon icon={faHeart}/>
            </div>
            
          </div>
          </div>
        </div>
    </div>
  );
};

export default CardProductApp