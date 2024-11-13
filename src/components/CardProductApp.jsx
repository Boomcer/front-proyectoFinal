import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import "./CardProductApp.css";
import { Link } from "react-router-dom";


const CardProductApp = ({producto}) => {

  return (
    <div className="col">
      <Link className="nav-link" to={`/producto/${producto._id}`}> 
      <div id="card" className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark">
        <div id="content-img" className="align-items-center">
        <a href=""><img 
          src={producto.image} 
          className="card-img-top" 
          alt={producto.title}
          />
          </a>
        </div>
          <div className="card-body text-light">
          <h6 className="card-title">{producto.title}</h6>
          <p className="card-text">$ {producto.price}</p>
          <div className="d-flex align-items-center justify-content-around">
            <div>
              <a href="#" className="btn btn-outline-secondary">Añadir a carrito</a>
            </div>
            <a href=""><div style={{fontSize:"2em", color:"#e0e0e0"}}>
              <FontAwesomeIcon icon={faHeart}/>
            </div>
            </a>
          </div>
          </div>
        </div>
        </Link>
    </div>
  );
};

export default CardProductApp