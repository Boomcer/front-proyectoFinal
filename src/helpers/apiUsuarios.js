const url = import.meta.env.VITE_API_URL + "/api/usuarios";

const getUsuario = async (uid) => {
  const token = JSON.parse(localStorage.getItem("token")); // Token desde localStorage
  const resp = await fetch(`${url}/${uid}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token, // Token enviado en headers
    },
  });
  const data = await resp.json();
  return data;
};

const putUsuario = async (uid, datos) => {
  const token = JSON.parse(localStorage.getItem("token")); // Token desde localStorage
  const resp = await fetch(`${url}/${uid}`, {
    method: "PUT",
    body: JSON.stringify(datos), // Datos a actualizar
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": token, // Token enviado en headers
    },
  });
  const data = await resp.json();
  return data;
};

const addToCarrito = async (productoId, cantidad = 1) => {
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  if (!uid || !token) {
    throw new Error("El UID o el token no están disponibles en localStorage.");
  }

  const datos = {
    carrito: [{ productoId, cantidad }],
  };

  const resp = await fetch(`${url}/${uid}`, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(token),
    },
  });

  if (!resp.ok) {
    throw new Error("Error al añadir el producto al carrito.");
  }

  return await resp.json();
};

const deleteFromCarrito = async (productoId) => {
  const uid = localStorage.getItem("uid");
  const token = JSON.parse(localStorage.getItem("token"));

  if (!uid || !token) {
    throw new Error("El UID o el token no están disponibles en localStorage.");
  }

  const body = {
    eliminarCarrito: [{ productoId }],
  };

  try {
    const resp = await fetch(`${url}/${uid}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    if (!resp.ok) {
      const errorMessage = await resp.text();
      throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error.message);
    throw error;
  }
};
const addToFavoritos = async (productoId) => {
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  if (!uid || !token) {
    throw new Error("El UID o token no se encuentra en localStorage");
  }
  const datos = {
    favoritos: [{ productoId }],
  };
  const resp = await fetch(`${url}/${uid}`, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(token),
    },
  });
  if (!resp.ok) {
    const errorMessage = await resp.text();
    throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
  }
  const data = await resp.json();
  return data;
};

// Eliminar producto de favoritos
const deleteToFavoritos = async (productoId) => {
  const uid = localStorage.getItem("uid");
  const token = JSON.parse(localStorage.getItem("token"));

  if (!uid || !token) {
    throw new Error("El UID o el token no están disponibles en localStorage.");
  }

  const body = {
    eliminarFavorito: [productoId],
  };

  try {
    // Solicitud PUT al backend
    const resp = await fetch(`${url}/${uid}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    if (!resp.ok) {
      const errorMessage = await resp.text();
      throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el favorito:", error.message);
    throw error;
  }
};

const putCarrito = async (productoId, cantidad) => {
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  if (!uid || !token) {
    throw new Error("El UID o el token no están disponibles en localStorage.");
  }

  const datos = {
    productoId,
    cantidad,
  };

  const resp = await fetch(`${url}/${uid}`, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
      "x-token": JSON.parse(token),
    },
  });

  if (!resp.ok) {
    const errorMessage = await resp.text();
    throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
  }

  const data = await resp.json();
  return data;
};

const clearCarrito = async () => {
  const uid = localStorage.getItem("uid");
  const token = JSON.parse(localStorage.getItem("token"));
  if (!uid || !token) {
    throw new Error("El UID o el token no están disponibles en localStorage.");
  }
  try {
    // Solicitud PUT al backend para vaciar el carrito
    const resp = await fetch(`${url}/${uid}`, {
      method: "PUT",
      body: JSON.stringify({ vaciarCarrito: true }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    if (!resp.ok) {
      const errorMessage = await resp.text();
      throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error al vaciar el carrito:", error.message);
    throw error;
  }
};

const refreshUsuario = async () => {
  const uid = localStorage.getItem("uid"); // Obtener UID desde localStorage
  const token = JSON.parse(localStorage.getItem("token")); // Obtener Token desde localStorage
  if (!uid || !token) {
    throw new Error("El UID o el token no están disponibles en localStorage.");
  }
  try {
    // Hacer el GET para obtener los datos del usuario
    const data = await getUsuario(uid);
    localStorage.setItem("carrito", JSON.stringify(data.carrito || []));
    localStorage.setItem(
      "favoritos",
      JSON.stringify(data.usuario.favoritos || [])
    );
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
    throw error; // Re-throw error to handle it at the calling level
  }
};
export {
  getUsuario,
  putUsuario,
  addToCarrito,
  addToFavoritos,
  refreshUsuario,
  deleteToFavoritos,
  deleteFromCarrito,
  putCarrito,
  clearCarrito,
};
