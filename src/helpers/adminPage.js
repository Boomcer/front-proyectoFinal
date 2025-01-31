const API_URL = import.meta.env.VITE_API_URL + "/api";
const urlProductosCategoria =
  import.meta.env.VITE_API_URL + "/api/productos/categoria/";

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

export const getProductosPorCategoria = async (categoriaId) => {
  if (!categoriaId) {
    console.error(
      "Error en getProductosPorCategoria: ID de categoría inválido"
    );
    throw new Error("El ID de la categoría es inválido.");
  }

  try {
    const resp = await fetch(`${urlProductosCategoria}${categoriaId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": JSON.parse(localStorage.getItem("token")),
      },
    });

    if (!resp.ok) {
      throw new Error("Error al obtener los productos por categoría");
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error en getProductosPorCategoria:", error.message);
    return { productos: [] };
  }
};

export const obtenerUsuarios = async (limite = 5, desde = 0) => {
  try {
    const response = await fetch(
      `${API_URL}/usuarios?limite=${limite}&desde=${desde}`,
      {
        headers: getHeaders(),
      }
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el usuario");
  }

  const data = await response.json();
  return data;
};

export const actualizarUsuario = async (id, usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Error al crear el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    throw error;
  }
}