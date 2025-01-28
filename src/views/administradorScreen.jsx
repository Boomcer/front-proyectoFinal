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
  eliminarProducto,
} from '../helpers/adminPage.js';
import Swal from 'sweetalert2';

const AdministradorScreen = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [paginacion, setPaginacion] = useState({
    total: 0,
    limite: 5,
    desde: 0,
  });

  useEffect(() => {
    cargarProductos();
  }, [paginacion.desde, paginacion.limite]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos(paginacion.limite, paginacion.desde);

      // Asegurar que todos los productos tengan un valor para la imagen
      const productosConImagen = data.productos.map((producto) => ({
        ...producto,
        imagen: producto.img || 'https://i.pinimg.com/736x/a9/29/16/a92916d371b56dbbbde21dd289aa13c8.jpg', // Imagen por defecto
      }));

      setProductos(productosConImagen);
      setPaginacion((prev) => ({
        ...prev,
        total: data.total,
      }));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los productos. Verifica tu token de acceso.',
      });
    }
  };

  const handleGuardarProducto = async (producto) => {
    try {
      if (productoEditando) {
        await actualizarProducto(productoEditando._id, producto);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto actualizado correctamente',
        });
      } else {
        await crearProducto(producto);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto creado correctamente',
        });
      }
      await cargarProductos();
      setMostrarFormulario(false);
      setProductoEditando(null);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al procesar el producto',
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
        text: 'Producto eliminado correctamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo eliminar el producto',
      });
    }
  };

  const handleCambiarPagina = (numeroPagina) => {
    setPaginacion((prev) => ({
      ...prev,
      desde: (numeroPagina - 1) * prev.limite,
    }));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Administrador de Productos</h1>

      {/* Mostrar el total de productos */}
      <div className="mb-4 text-center">
        <h4>Total de productos: {paginacion.total}</h4>
      </div>

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
              onGuardar={handleGuardarProducto}
              onCancelar={() => {
                setMostrarFormulario(false);
                setProductoEditando(null);
              }}
            />
          </div>
        </div>
      )}

      <TablaProductos
        productos={productos}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      <Paginacion
        total={paginacion.total}
        limite={paginacion.limite}
        desde={paginacion.desde}
        onCambiarPagina={handleCambiarPagina}
      />
    </div>
  );
};

export default AdministradorScreen;