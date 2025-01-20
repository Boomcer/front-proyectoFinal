import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CardCarrito = ({ producto, onDeleteCarrito, onUpdateCantidad }) => {
  const { _id, nombre, precio, img, carritoId, cantidad } = producto; // Extraer las propiedades necesarias

  const handleDelete = () => {
    if (carritoId) {
      console.log("ID del producto a eliminar del carrito:", carritoId);
      onDeleteCarrito(carritoId);
    } else {
      console.error("ID del producto no válido:", carritoId);
    }
  };

  const handleSumar = () => {
    onUpdateCantidad(carritoId, cantidad + 1);
  };

  const handleRestar = () => {
    if (cantidad > 1) {
      onUpdateCantidad(carritoId, cantidad - 1);
    }
  };

  return (
    <div className="col">
      <div
        id="card"
        className="card d-flex align-items-center justify-content-center text-center border-2 shadow bg-dark mt-2"
      >
        <Link className="nav-link" to={`/producto/${_id}`}>
          <div id="content-img" className="align-items-center">
            <img
              src={img || "/default-image.png"}
              className="card-img-top"
              alt={nombre || "Producto"}
              style={{
                width: "150px",
                height: "80px",
                objectFit: "cover",
              }}
            />
          </div>
        </Link>
        <div className="card-body text-light">
          <h6 className="card-title">{nombre || "Producto sin nombre"}</h6>
          <p className="card-text">${precio || "0.00"}</p>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleRestar}
              disabled={cantidad <= 1}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className="fw-bold">{cantidad}</span>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={handleSumar}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-danger mt-2"
          >
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
    carritoId: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteCarrito: PropTypes.func.isRequired,
  onUpdateCantidad: PropTypes.func.isRequired,
};

export default CardCarrito;
