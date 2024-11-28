import { useState } from 'react';
import Swal from 'sweetalert2';

const TablaProductos = ({ productos, onEditar, onEliminar }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
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
        image: 'img-fluid'
      }
    });
  };

  if (!Array.isArray(productos)) {
    return <div className="alert alert-info">No hay productos disponibles</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>
                {producto.imagen && (
                  <div 
                    className="product-image-container"
                    onMouseEnter={() => setHoveredImage(producto._id)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onClick={() => mostrarImagenCompleta(producto.imagen, producto.nombre)}
                  >
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="product-image"
                    />
                    {hoveredImage === producto._id && (
                      <div className="image-overlay">
                        <span>Ver</span>
                      </div>
                    )}
                  </div>
                )}
              </td>
              <td>{producto.nombre || 'Sin nombre'}</td>
              <td>
                <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {producto.descripcion || 'Sin descripción'}
                </div>
              </td>
              <td>${producto.precio?.toFixed(2) || '0.00'}</td>
              <td>{producto.stock || 0}</td>
              <td>{producto.categoria?.nombre || producto.categoria || 'Sin categoría'}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEditar(producto)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmarEliminacion(producto._id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                <div className="alert alert-info mb-0">
                  No hay productos para mostrar
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;