import React, { useState, useEffect } from 'react';
import '../css/adminPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductoForm from '../components/ProductoForm';
import TablaProductos from '../components/TablaProductos';
import Paginacion from '../components/Paginacion';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../helpers/adminPage.js';
import Swal from 'sweetalert2';

const AdministradorScreen = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [paginacion, setPaginacion] = useState({
    total: 0,
    limite: 5,
    desde: 0
  });

  useEffect(() => {
    cargarProductos();
  }, [paginacion.desde, paginacion.limite]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos(paginacion.limite, paginacion.desde);
      setProductos(data.productos);
      setPaginacion((prev) => ({
        ...prev,
        total: data.total
      }));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los productos. Verifica tu token de acceso.'
      });
    }
  };

  const handleSubmit = async (producto) => {
    try {
      if (productoEditando) {
        await actualizarProducto(productoEditando._id, producto);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto actualizado correctamente'
        });
      } else {
        await crearProducto(producto);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto creado correctamente'
        });
      }
      await cargarProductos();
      setMostrarFormulario(false);
      setProductoEditando(null);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al procesar el producto'
      });
    }
  };

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarProducto(id);
      await cargarProductos();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producto eliminado correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo eliminar el producto'
      });
    }
  };

  const handleCambiarPagina = (numeroPagina) => {
    setPaginacion((prev) => ({
      ...prev,
      desde: (numeroPagina - 1) * prev.limite
    }));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Administrador de Productos</h1>

      {!mostrarFormulario ? (
        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Producto
          </button>
        </div>
      ) : (
        <div className="card-admin mb-4">
          <div className="card-admin-body">
            <h2 className="card-admin-title mb-4 text-center">
              {productoEditando ? 'Editar' : 'Agregar'} Producto
            </h2>
            <ProductoForm
              producto={productoEditando}
              onSubmit={handleSubmit}
              onCancel={() => {
                setMostrarFormulario(false);
                setProductoEditando(null);
              }}
            />
          </div>
        </div>
      )}

      <div className="table-responsive">
        <TablaProductos
          productos={productos}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Paginacion
          total={paginacion.total}
          limite={paginacion.limite}
          desde={paginacion.desde}
          onCambiarPagina={handleCambiarPagina}
        />
      </div>
    </div>
  );
};

export default AdministradorScreen;