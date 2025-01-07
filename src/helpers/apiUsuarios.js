const url = "https://backend-proyectofinal-rolling.onrender.com/api/usuarios";
// Obtener información del usuario
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

// Actualizar información del usuario
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

// Añadir producto al carrito
const addToCarrito = async (productoId, cantidad = 1) => {
    const uid = localStorage.getItem("uid"); // Obtener UID desde localStorage
    const token = JSON.parse(localStorage.getItem("token")); // Obtener Token desde localStorage

    if (!uid || !token) {
        throw new Error("El UID o el token no están disponibles en localStorage.");
    }

    // Estructura de los datos que se enviarán al backend
    const datos = {
        carrito: [{ 
            productoId, 
            cantidad 
        }],
    };

    console.log("Datos enviados al carrito:", datos);

    // Realizar la solicitud al backend para actualizar el carrito
    const resp = await fetch(`https://backend-proyectofinal-rolling.onrender.com/api/usuarios/${uid}`, {
        method: "PUT",
        body: JSON.stringify(datos),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": token, // Token enviado en headers
        },
    });

    if (!resp.ok) {
        const errorMessage = await resp.text();
        throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
};

// Añadir producto a favoritos
const addToFavoritos = async (productoId) => {
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("token");
    if (!uid || !token) {
        throw new Error("El UID o token no se encuentra en localStorage");
    }
    const datos = {
        favoritos: [{ productoId }],
    };
    console.log("Datos enviados a favoritos:", datos);
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
    console.log("Token:", token);
    
    if (!token) {
        throw new Error("El token no está disponible en localStorage.");
    }

    // Estructura de los datos que se enviarán al backend
    const datos = {
        eliminarFavorito: [{ 
            productoId 
        }],
    };

    
    console.log("Datos enviados para eliminar favorito:", datos);

    // Realizar la solicitud al backend para eliminar el favorito
    const resp = await fetch( `${url}/${uid}` , {
        method: "PUT",
        body: JSON.stringify(datos),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": token, // Token enviado en headers
        },
    });

    if (!resp.ok) {
        const errorMessage = await resp.text();
        throw new Error(errorMessage || `Error del servidor: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
};


// Actualizar información del usuario en localStorage
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
        localStorage.setItem("favoritos", JSON.stringify(data.usuario.favoritos || []));
    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
        throw error; // Re-throw error to handle it at the calling level
    }
};
export { getUsuario, putUsuario, addToCarrito, addToFavoritos, refreshUsuario, deleteToFavoritos };