const API_URL = 'https://backend-proyectofinal-rolling.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const getHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error('No hay token de acceso. Por favor, inicia sesión.');
  }
  return {
    'Content-Type': 'application/json',
    'x-token': token
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || 'Error en la operación');
  }
  return response.json();
};

export const obtenerProductos = async (limite = 5, desde = 0) => {
  try {
    const response = await fetch(
      `${API_URL}/productos?limite=${limite}&desde=${desde}`,
      { headers: getHeaders() }
    );
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(producto)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(producto)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};