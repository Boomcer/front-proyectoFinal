const API_URL = import.meta.env.VITE_API_URL + "/api";

export const buscarProductos = async (query) => {
  try {
    const url = `${API_URL}/buscar/productos/${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(localStorage.getItem("token")),
      },
    });

    if (!response.ok) {
      throw new Error(`Error al buscar productos: ${response.statusText}`);
    }

    const data = await response.json();

    return data.result || [];
  } catch (error) {
    console.error("Error en buscarProductos:", error);
    return [];
  }
};
