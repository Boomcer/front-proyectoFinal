const API_URL = import.meta.env.VITE_API_URL + '/api';

export const buscarProductos = async (query) => {
  try {
    const url = `${API_URL}/buscar/productos/${encodeURIComponent(query)}`;
    console.log("URL de búsqueda:", url); // Depuración

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(localStorage.getItem("token")),
      },
    });

    console.log("Respuesta de la API:", response); // Depuración

    if (!response.ok) {
      throw new Error(`Error al buscar productos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos de la API:", data); // Depuración

    return data.result || [];
  } catch (error) {
    console.error('Error en buscarProductos:', error);
    return [];
  }
};