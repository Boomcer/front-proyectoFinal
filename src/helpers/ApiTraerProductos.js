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