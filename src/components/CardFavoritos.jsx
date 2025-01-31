import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CardFavoritos = ({ producto, id, onDeleteFavorito }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto de tus favoritos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteFavorito(id);
        Swal.fire(
          "Eliminado",
          "El producto ha sido eliminado de tus favoritos.",
          "success"
        );
      }
    });
  };

  return (
    <div className="col w-100 d-flex justify-content-center m-2 ">
      <div
        id="card"
        className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark"
      >
        <Link className="nav-link" to={`/producto/${producto._id}`}>
          <div id="content-img" className="align-items-center">
            <img
              src={producto.img || "/default-image.png"}
              className="card-img-top"
              alt={producto.nombre || "Producto"}
            />
          </div>
        </Link>
        <div className="card-body text-light">
          <h6 className="card-title">
            {producto.nombre || "Producto sin nombre"}
          </h6>
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
  id: PropTypes.string.isRequired,
  onDeleteFavorito: PropTypes.func.isRequired,
};

export default CardFavoritos;
