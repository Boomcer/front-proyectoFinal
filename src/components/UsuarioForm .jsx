import React, { useState } from 'react';

const UsuarioForm = ({ usuario, onGuardar, onCancelar }) => {
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [rol, setRol] = useState(usuario?.rol || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Por favor, ingresa un email válido.");
      return;
    }
    setIsLoading(true);
    try {
      await onGuardar({ nombre, email, rol, password });
      setNombre('');
      setEmail('');
      setRol('');
      setPassword('');
    } catch (error) {
      alert(`Error al guardar el usuario: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = nombre && email && rol;

  return (
    <div className="card-admin mb-4">
      <div className="card-admin-body">
        <h2 className="card-admin-title mb-4 text-center">
          {usuario ? 'Editar' : 'Agregar'} Usuario
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol
            </label>
            <select
              className="form-select"
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="ADMIN_ROL">Administrador</option>
              <option value="USER_ROL">Usuario</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={!isFormValid || isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioForm;