import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CardCarrito = ({ producto, onDeleteCarrito }) => {
  const { _id, nombre, precio, img } = producto;

  // Función para eliminar un producto del carrito con SweetAlert2
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteCarrito(_id);
        Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
      }
    });
  };

  return (
    <div className="col">
      <div className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark mt-2">
        <Link className="nav-link" to={`/producto/${_id}`}>
          <div id="content-img" className="align-items-center">
            <img
              src={img || "/default-image.png"}
              className="card-img-top"
              alt={nombre || "Producto"}
              style={{ width: "150px", height: "80px", objectFit: "cover" }}
            />
          </div>
        </Link>
        <div className="card-body text-light">
          <h6 className="card-title">{nombre || "Producto sin nombre"}</h6>
          <p className="card-text">${precio || "0.00"}</p>
          <button onClick={handleDelete} className="btn btn-sm btn-danger mt-2">
            <FontAwesomeIcon icon={faTrash} /> Eliminar del Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

CardCarrito.propTypes = {
  producto: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    img: PropTypes.string,
  }).isRequired,
  onDeleteCarrito: PropTypes.func.isRequired,
};

export default CardCarrito;
