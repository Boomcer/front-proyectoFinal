export const buscarProductos = async (productoId) => {
  try {
    const response = await fetch(`/api/buscar/producto/${productoId}`);
    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }
    const data = await response.json();
    return data.result; // Asegúrate de que la estructura de datos sea correcta
  } catch (error) {
    console.error('Error en buscarProductos:', error);
    return [];
  }
};