import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuario, putUsuario } from '../helpers/apiUsuarios';

const PerfilScreen = () => {
  const [usuario, setUsuario] = useState(null); // Estado para guardar los datos del usuario
  const [editMode, setEditMode] = useState(false); // Controla si los campos están habilitados
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen precargada
  const [deleteAccount, setDeleteAccount] = useState(false); // Estado para el checkbox "Eliminar cuenta"
  const navigate = useNavigate(); // Hook para redirigir
  const uid = JSON.parse(localStorage.getItem("uid")) || null; // Obtener el UID del usuario

  // Cargar datos del usuario desde el backend al montar el componente
  useEffect(() => {
    setUsuario(null);
    if (uid) {
      getUsuario(uid).then((response) => {
        setUsuario(response?.usuario || {}); // Establecer datos del usuario
      });
    } else {
      alert("No se encontró un usuario logueado. Redirigiendo al login.");
      navigate('/login'); // Redirigir al login si no hay UID
    }

    // Limpiar el estado del usuario al desmontar el componente
    return () => setUsuario(null);
  }, [uid, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario((prev) => ({ ...prev, [id]: value }));
  };
  
    // Habilitar modo de edición o guardar cambios
    const handleEditClick = async () => {
      if (editMode) {
        // Guardar cambios en el backend
        try {
          putUsuario(uid,usuario).then((response)=>{
          setEditMode(response?.usuario || {});
          })
          //const response = await putUsuario(uid, usuario); // Llamada PUT al backend
          if (response.ok) {
            alert("Datos actualizados correctamente.");
            setEditMode(false); // Deshabilitar edición
          } else {
            alert("Error al actualizar los datos. Verifique e intente nuevamente.");
          }
        } catch (error) {
          console.error("Error al actualizar los datos:", error);
          alert("Ocurrió un error. Intente nuevamente más tarde.");
        }
      } else {
        // Habilitar modo de edición
        setEditMode(true);
      }
    };
  
    // Manejar la selección de una nueva imagen
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file)); // Mostrar previsualización
        setUsuario((prev) => ({ ...prev, img: file })); // Agregar la imagen al estado del usuario
      }
    };
  
    // Cerrar y regresar al home
    const handleClose = () => {
      setUsuario(null);
      navigate("/");
    };
  
    return (
      <div className="container mt-5">
        {usuario ? (
          <>
            <h2 className="mb-4">Hola, {usuario.email}</h2>
            <h3 className="mb-4">Mis Datos Personales</h3>
            <form>
              {/* Campo de Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  value={usuario.nombre || ""}
                  onChange={handleChange}
                  disabled={!editMode} // Deshabilitado por defecto
                />
              </div>
  
              {/* Campo de Nueva Contraseña */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={usuario.password || ""} // Vacío inicialmente
                  onChange={handleChange}
                  disabled={!editMode} // Deshabilitado por defecto
                />
              </div>
  
              {/* Imagen de Perfil */}
              <div className="mb-3">
                <label htmlFor="profileImage" className="form-label">Imagen de Perfil</label>
                <div className="text-center">
                  <img
                    src={selectedImage || usuario.img || "https://via.placeholder.com/150"}
                    alt="Perfil"
                    className="img-thumbnail mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
                <input
                  type="file"
                  id="profileImage"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!editMode} // Deshabilitado por defecto
                />
              </div>
  
              {/* Checkbox "Eliminar cuenta" */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="deleteAccount"
                  checked={deleteAccount}
                  onChange={(e) => setDeleteAccount(e.target.checked)}
                  disabled={!editMode} // Deshabilitado por defecto
                />
                <label className="form-check-label" htmlFor="deleteAccount">
                  Eliminar cuenta
                </label>
              </div>
  
              {/* Botones */}
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
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cerrar
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
  