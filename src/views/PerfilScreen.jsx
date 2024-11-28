import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    closeAccount: false,
    profileImage: '',
  });

  const [previewImage, setPreviewImage] = useState(null); // Previsualización de imagen

  const uid = localStorage.getItem('uid'); // Obtener el UID del usuario del localStorage

  // Simular consulta a la base de datos para obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${uid}`); // Cambiar por tu API
        const data = await response.json();
        setFormData({
          name: data.name,
          password: '', // Por seguridad, no prellenar el password
          closeAccount: false,
          profileImage: data.profileImage,
        });
        setPreviewImage(data.profileImage); // Establecer la imagen del perfil
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Manejar subida de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Previsualizar la imagen
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file, // Guardar el archivo para enviarlo al backend
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Usar FormData para enviar la imagen y otros datos
      formDataToSend.append('name', formData.name);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('closeAccount', formData.closeAccount);
      if (formData.profileImage instanceof File) {
        formDataToSend.append('profileImage', formData.profileImage); // Añadir imagen solo si es nueva
      }

      const response = await fetch(`https://api.example.com/users/${uid}`, {
        method: 'PUT', // Método para actualizar datos
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Cambios guardados con éxito');
        navigate('/'); // Redirigir al Home
      } else {
        console.error('Error al guardar cambios:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Mi Perfil</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Cerrar mi cuenta */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="closeAccount"
            name="closeAccount"
            className="form-check-input"
            checked={formData.closeAccount}
            onChange={handleInputChange}
          />
          <label htmlFor="closeAccount" className="form-check-label">
            Cerrar mi cuenta
          </label>
        </div>

        {/* Imagen de perfil */}
        <div className="mb-3">
          <label className="form-label">Imagen de Perfil</label>
          <div className="text-center">
            <img
              src={previewImage || 'https://via.placeholder.com/150'}
              alt="Profile Preview"
              className="img-thumbnail mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        {/* Botón para guardar cambios */}
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default PerfilScreen;
