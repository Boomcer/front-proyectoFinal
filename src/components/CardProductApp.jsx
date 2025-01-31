import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addToCarrito, addToFavoritos, refreshUsuario } from "../helpers/apiUsuarios.js";
import "../css/CardProductApp.css";

const CardProductApp = ({ producto }) => {
  const [loadingCarrito, setLoadingCarrito] = useState(false);
  const [loadingFavoritos, setLoadingFavoritos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setIsFavorite(favoritos.some((fav) => fav._id === producto._id));
  }, [producto._id]);

  const handleAddToCarrito = async (e) => {
    e.stopPropagation(); // Evita que el click active el Link
    setLoadingCarrito(true);
    try {
      await addToCarrito(producto._id, 1);
      await refreshUsuario();
      
      Swal.fire({
        title: "¡Añadido al carrito!",
        text: "El producto se ha añadido correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      Swal.fire({
        title: "Error",
        text: error.message.includes("UID") || error.message.includes("token")
          ? "Por favor, inicie sesión nuevamente."
          : "Hubo un problema al añadir el producto al carrito.",
        icon: "error"
      });
    } finally {
      setLoadingCarrito(false);
    }
  };

  const handleAddToFavoritos = async (e) => {
    e.stopPropagation(); // Evita que el click active el Link
    setLoadingFavoritos(true);
    try {
      await addToFavoritos(producto._id);
      await refreshUsuario();

      const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      if (isFavorite) {
        const nuevosFavoritos = favoritos.filter((fav) => fav._id !== producto._id);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
        setIsFavorite(false);
      } else {
        favoritos.push(producto);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        setIsFavorite(true);
      }

      Swal.fire({
        title: isFavorite ? "Eliminado de favoritos" : "¡Añadido a favoritos!",
        text: isFavorite ? "Se ha eliminado de tu lista." : "El producto se ha añadido correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("Error al añadir a favoritos:", error);
      Swal.fire({
        title: "Error",
        text: error.message.includes("UID") || error.message.includes("token")
          ? "Por favor, inicie sesión nuevamente."
          : "Hubo un problema al añadir el producto a favoritos.",
        icon: "error"
      });
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
        </div>
        <div className="d-flex align-items-center justify-content-around w-100 m-2 gap-1">
          <button
            onClick={handleAddToCarrito}
            className="btn btn-outline-secondary"
            disabled={loadingCarrito}
          >
            {loadingCarrito ? "Cargando..." : "Añadir a carrito"}
          </button>
          <div
            onClick={!loadingFavoritos ? handleAddToFavoritos : null}
            style={{
              fontSize: "2em",
              color: isFavorite ? "red" : "#E0E0E0",
              cursor: loadingFavoritos ? "not-allowed" : "pointer",
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductApp;