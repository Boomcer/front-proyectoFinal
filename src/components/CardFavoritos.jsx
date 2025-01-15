import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CardFavoritos = ({ producto, id, onDeleteFavorito }) => {
  const handleDelete = () => {
    if (id) {
      console.log("ID del favorito a eliminar:", id);
      onDeleteFavorito(id); // Usar el ID del favorito
    } else {
      console.error("ID del favorito no válido:", id);
    }
  };

  return (
    <div className="col">
      <div
        id="card"
        className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark"
      >
        <Link className="nav-link" to={`/producto/${producto._id}`}>
          <div id="content-img" className="align-items-center">
            <img
              src={producto.img || "/default-image.png"} // Imagen por defecto
              className="card-img-top"
              alt={producto.nombre || "Producto"}
            />
          </div>
        </Link>
        <div className="card-body text-light">
          <h6 className="card-title">{producto.nombre || "Producto sin nombre"}</h6>
          <p className="card-text">$ {producto.precio || "0.00"}</p>
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

CardFavoritos.propTypes = {
  producto: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired, // ID del favorito
  onDeleteFavorito: PropTypes.func.isRequired,
};

export default CardFavoritos;
