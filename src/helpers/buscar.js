const API_URL = import.meta.env.VITE_API_URL + '/api';

export const buscarProductos = async (query) => {
  try {
    // Construir la URL correcta con el término de búsqueda
    const url = `${API_URL}/buscar/productos/${encodeURIComponent(query)}`;
    
    // Realizar la solicitud
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(localStorage.getItem("token")), // Asegúrate de incluir el token si es necesario
      },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error al buscar productos: ${response.statusText}`);
    }

    // Obtener los datos de la respuesta
    const data = await response.json();

    // Devolver los resultados
    return data.result || []; // Asegúrate de devolver un array vacío si no hay resultados
  } catch (error) {
    console.error('Error en buscarProductos:', error);
    return []; // Devolver un array vacío en caso de error
  }
};