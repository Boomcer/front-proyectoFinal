const url = "https://backend-proyectofinal-rolling.onrender.com/api/productos?limite=5&desde=0";

export async function destacados(limite = 5, desde =0){
    try{
        const response = await fetch(`${url}?limite=${limite}&desde=${desde}`,{
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error("Error al obtener los productos")
        }

        const data = await response.json();
        const destacados = data.productos.filter(producto => producto.destacado);
        return destacados;
    }catch(error){
        console.error("Error en la conexion con el backend:", error);
        return[]
    }
}


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