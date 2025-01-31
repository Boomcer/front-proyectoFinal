const API_URL = import.meta.env.VITE_API_URL + "/api";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error("No hay token de acceso. Por favor, inicia sesión.");
  }
  return {
    "Content-type": "application/json; charset=UTF-8",
    "x-token": JSON.parse(localStorage.getItem("token")),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg || "Error en la operación");
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
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(producto),
    });

    if (response.status === 401) {
      console.error(
        "El token no es válido o ha expirado. Inicia sesión nuevamente."
      );
      throw new Error("Token no válido o expirado.");
    }

    return await handleResponse(response);
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    if (!id) {
      throw new Error("El ID del producto es obligatorio.");
    }

    console.log("Actualizando producto:", id, producto);

    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(producto),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

// Nueva función para obtener categorías
export const obtenerCategorias = async (limite = 10, desde = 0) => {
  try {
    const response = await fetch(
      `${API_URL}/categorias?limite=${limite}&desde=${desde}`,
      { headers: getHeaders() }
    );

    return handleResponse(response);
    
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

