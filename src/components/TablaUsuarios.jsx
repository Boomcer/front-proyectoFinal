import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "../css/TablaUsuarios.css";

const TablaUsuarios = ({ usuarios, onEditar, onEliminar }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

 
  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onEliminar(id); 
      }
    });
  };

  const mostrarImagenCompleta = (imagen, nombre) => {
    Swal.fire({
      imageUrl: imagen,
      imageAlt: nombre,
      title: nombre,
      width: 600,
      imageWidth: 400,
      imageHeight: 400,
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        image: "img-fluid",
      },
    });
  };

  if (!usuarios || usuarios.length === 0) {
    return <div>No hay usuarios disponibles.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>
                {usuario.img && (
                  <div
                    className="user-image-container"
                    onMouseEnter={() => setHoveredImage(usuario._id)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onClick={() =>
                      mostrarImagenCompleta(usuario.img, usuario.nombre)
                    }
                  >
                    <img
                      src={usuario.img}
                      alt={usuario.nombre}
                      className="user-image img-fluid"
                      width="50"
                      height="50"
                    />
                    {hoveredImage === usuario._id && (
                      <div className="image-overlay">
                        <span>Ver</span>
                      </div>
                    )}
                  </div>
                )}
              </td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEditar(usuario)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmarEliminacion(usuario._id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TablaUsuarios.propTypes = {
  usuarios: PropTypes.array.isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};

export default TablaUsuarios;
