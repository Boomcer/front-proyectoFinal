import React, { useState, useEffect } from 'react';
import '../css/adminPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductoForm from '../components/ProductoForm';
import TablaProductos from '../components/TablaProductos';
import TablaUsuarios from '../components/TablaUsuarios';
// import UsuarioForm from '../components/UsuarioForm';
import Paginacion from '../components/Paginacion';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
} from '../helpers/adminPage.js';
import Swal from 'sweetalert2';

const AdministradorScreen = () => {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioUsuario, setMostrarFormularioUsuario] = useState(false);
  // Estados de paginación separados
  const [paginacionProductos, setPaginacionProductos] = useState({
    total: 0,
    limite: 5,
    desde: 0,
  });

  const [paginacionUsuarios, setPaginacionUsuarios] = useState({
    total: 0,
    limite: 5,
    desde: 0,
  });

  // Cargar productos cuando cambie la paginación de productos
  useEffect(() => {
    cargarProductos();
  }, [paginacionProductos.desde, paginacionProductos.limite]);

  // Cargar usuarios cuando cambie la paginación de usuarios
  useEffect(() => {
    cargarUsuarios();
  }, [paginacionUsuarios.desde, paginacionUsuarios.limite]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos(paginacionProductos.limite, paginacionProductos.desde);
      const productosConImagen = data.productos.map((producto) => ({
        ...producto,
        imagen: producto.img || 'https://i.pinimg.com/736x/a9/29/16/a92916d371b56dbbbde21dd289aa13c8.jpg',
      }));

      setProductos(productosConImagen);
      setPaginacionProductos((prev) => ({
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

 const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios(paginacionUsuarios.limite, paginacionUsuarios.desde);
      console.log(data); // Inspeccionar la respuesta de la API
      setUsuarios(data.todosLosUsuarios || []);
      setPaginacionUsuarios((prev) => ({
        ...prev,
        total: data.usuariosActivos || 0, // Ajusta según la respuesta de la API
      }));
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setUsuarios([]);
    }
  };
;

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

  const handleCambiarPaginaProductos = (numeroPagina) => {
    setPaginacionProductos((prev) => ({
      ...prev,
      desde: (numeroPagina - 1) * prev.limite,
    }));
  };

  const handleCambiarPaginaUsuarios = (numeroPagina) => {
    setPaginacionUsuarios((prev) => ({
      ...prev,
      desde: (numeroPagina - 1) * prev.limite,
    }));
  };

 // Función para eliminar un usuario
  const handleEliminarUsuario = async (id) => {
    try {
      await eliminarUsuario(id); // Llama a la función eliminarUsuario
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario eliminado correctamente',
      });
      await cargarUsuarios(); // Recarga la lista de usuarios después de eliminar
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo eliminar el usuario',
      });
    }
  };


  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Administrador de Productos</h1>

      {/* Mostrar el total de productos */}
      <div className="mb-4 text-center">
        <h4>Total de productos: {paginacionProductos.total}</h4>
      </div>

      {/* Mostrar formulario de productos */}
      {!mostrarFormulario ? (
        <div className="d-flex justify-content-center mb-4 gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Producto
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setMostrarFormularioUsuario(true)}
          >
            Agregar Usuario
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

      

      {/* Tabla de productos */}
      <TablaProductos
        productos={productos}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      {/* Paginación de productos */}
      <Paginacion
        total={paginacionProductos.total}
        limite={paginacionProductos.limite}
        desde={paginacionProductos.desde}
        onCambiarPagina={handleCambiarPaginaProductos}
      />

      {/* Tabla de usuarios */}
      <h2 className="mb-4 mt-4 text-center">Usuarios</h2>
      <TablaUsuarios
        usuarios={usuarios}
        onEditar={() => {}}
        onEliminar={handleEliminarUsuario}
      />

      {/* Paginación de usuarios */}
      <Paginacion
        total={paginacionUsuarios.total}
        limite={paginacionUsuarios.limite}
        desde={paginacionUsuarios.desde}
        onCambiarPagina={handleCambiarPaginaUsuarios}
      />
    </div>
  );
};

export default AdministradorScreen;