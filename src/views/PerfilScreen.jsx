import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUsuario, putUsuario } from '../helpers/apiUsuarios';

const PerfilScreen = () => {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    setUsuario(null);
    if (uid) {
      getUsuario(uid).then((response) => {
        setUsuario(response?.usuario || {});
      });
    } else {
      Swal.fire({
        title: "Sesión no encontrada",
        text: "No se encontró un usuario logueado. Redirigiendo al login.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      }).then(() => navigate('/login'));
    }

    return () => setUsuario(null);
  }, [uid, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditClick = async () => {
    if (editMode) {
      try {
        const response = await putUsuario(uid, usuario);
        if (response.ok) {
          Swal.fire({
            title: "Datos actualizados",
            text: "Tus datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setEditMode(false);
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al actualizar los datos. Inténtalo de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error inesperado",
          text: "Ocurrió un error. Inténtalo más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      setEditMode(true);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se eliminarán tus credenciales y deberás iniciar sesión nuevamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("uid"); // Eliminar credenciales
        navigate("/login"); // Redirigir al login
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  return (
    <div className="container mt-5 mb-3">
      {usuario ? (
        <>
          <h2 className="mb-4">Hola, {usuario.nombre || 'Usuario'}</h2>
          <h3 className="mb-4">Mis Datos Personales</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={usuario.nombre || ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={usuario.email || ""}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="img" className="form-label">URL de Imagen de Perfil</label>
              <div className="text-center">
                <img
                  src={usuario.img || "https://via.placeholder.com/150"}
                  alt="Perfil"
                  className="img-thumbnail mb-3"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </div>
              <input
                type="text"
                id="img"
                className="form-control"
                value={usuario.img || ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control"
                  value={usuario.password || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditClick}
              >
                {editMode ? "Guardar Cambios" : "Actualizar Datos"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default PerfilScreen;