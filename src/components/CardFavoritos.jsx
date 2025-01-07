import React from "react";
import PropTypes from "prop-types"; // Para validación de props
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CardFavoritos = ({ producto, onDeleteFavorito }) => {
  const handleDelete = () => {
    if (producto?._id) {
      console.log("Producto a eliminar:", producto._id);
      onDeleteFavorito(producto._id);
    } else {
      console.error("ID del producto no válido:", producto);
    }
  };

  return (
    <div className="col">
      <div
        id="card"
        className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark"
      >
        <Link className="nav-link" to={`/producto/${producto?._id}`}>
          <div id="content-img" className="align-items-center">
            <img
              src={producto?.img || "/default-image.png"} // Imagen por defecto
              className="card-img-top"
              alt={producto?.nombre || "Producto"}
            />
          </div>
        </Link>
        <div className="card-body text-light">
          <h6 className="card-title">{producto?.nombre || "Producto sin nombre"}</h6>
          <p className="card-text">$ {producto?.precio || "0.00"}</p>
          <button
            onClick={handleDelete}
            className="btn btn-outline-danger mt-2"
          >
            <FontAwesomeIcon icon={faTrash} /> Eliminar de Favoritos
          </button>
        </div>
      </div>
    </div>
  );
};



export default CardFavoritos;
