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
    const uid = JSON.parse(localStorage.getItem("uid")).uid; // UID desde localStorage
    const datos = {
        carrito: [{ productoId, cantidad }], // Datos para el carrito
    };
    return await putUsuario(uid, datos); // Llamada a putUsuario
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
        // Actualizar el carrito y favoritos en localStorage con los datos obtenidos
        console.log(data);
        
        localStorage.setItem("carrito", JSON.stringify(data.carrito || []));

        localStorage.setItem("favoritos", JSON.stringify(data.usuario.favoritos || []));
    } catch (error) {
        console.error("Error al actualizar los datos del usuario:", error);
        throw error; // Re-throw error to handle it at the calling level
    }
};
export { getUsuario, putUsuario, addToCarrito, addToFavoritos, refreshUsuario };