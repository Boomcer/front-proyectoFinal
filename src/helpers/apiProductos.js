const url = "https://backend-proyectofinal-rolling.onrender.com/api/productos?desde=0";

const getProductos = async () => {
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
    });

    const data = await resp.json();

    return data;
};

    const getProducto = async (id) => {

    const resp = await fetch(url + "/" + id, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
    });

        const data = await resp.json();
        return data;
    };
    
    export {
    getProductos,
    getProducto,
};