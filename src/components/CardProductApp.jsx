import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addToCarrito, addToFavoritos, refreshUsuario } from "../helpers/apiUsuarios.js";
import "./CardProductApp.css";
const CardProductApp = ({ producto }) => {
      
  const [loadingCarrito, setLoadingCarrito] = useState(false);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const handleAddToCarrito = async () => {
    setLoadingCarrito(true);
    try {
        await addToCarrito(producto._id, 1);
        await refreshUsuario();
        alert("Producto añadido al carrito");
    } catch (error) {
        console.error("Error al añadir al carrito:", error);
        if (error.message.includes("UID") || error.message.includes("token")) {
            alert("Por favor, inicie sesión nuevamente.");
        } else {
            alert("Hubo un problema al añadir el producto al carrito.");
        }
    } finally {
        setLoadingCarrito(false);
    }
};
const handleAddToFavoritos = async () => {
    setLoadingFavoritos(true);
    try {
        await addToFavoritos(producto._id);
        await refreshUsuario();
        alert("Producto añadido a favoritos");
    } catch (error) {
        console.error("Error al añadir a favoritos:", error);
        if (error.message.includes("UID") || error.message.includes("token")) {
            alert("Por favor, inicie sesión nuevamente.");
        } else {
            alert("Hubo un problema al añadir el producto a favoritos.");
        }
    } finally {
        setLoadingFavoritos(false);
    }
};
  return (
    <div className="col">
        <div id="card" className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark">
        <Link className="nav-link" to={`/producto/${producto._id}`}>
          <div id="content-img" className="align-items-center">
            <img
              src={producto.img}
              className="card-img-top"
              alt={producto.nombre}
            />
          </div>
          </Link>
          <div className="card-body text-light">
          <Link className="nav-link" to={`/producto/${producto._id}`}>
            <h6 className="card-title">{producto.nombre}</h6>
          </Link>
            <p className="card-text">$ {producto.precio}</p>
            <div className="d-flex align-items-center justify-content-around">
              <div>
                <button
                  onClick={handleAddToCarrito}
                  className="btn btn-outline-secondary"
                  disabled={loadingCarrito}
                >
                  {loadingCarrito ? "Cargando..." : "Añadir a carrito"}
                </button>
              </div>
              <div
                onClick={!loadingFavoritos ? handleAddToFavoritos : null}
                style={{
                  fontSize: "2em",
                  color: loadingFavoritos ? "#aaa" : "#E0E0E0",
                  cursor: loadingFavoritos ? "not-allowed" : "pointer",
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default CardProductApp;