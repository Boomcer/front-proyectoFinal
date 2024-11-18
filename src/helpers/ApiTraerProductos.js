const url = "https://backend-proyectofinal-rolling.onrender.com/api/productos?limite=5&desde=0";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NzIxNGU1ZGQ3ZDU1OTc2MTAxZGQxZDgiLCJpYXQiOjE3MzE2ODQ0MjQsImV4cCI6MTczMTcyMDQyNH0.mCOncouNS5wouW7uKgjmYEAwdEf3TZpAIQ50ufRFhkY"

export async function getProducts(limite = 5, desde =0){
    try{
        const response = await fetch(`${url}?limite=${limite}&desde=${desde}`,{
            method: 'GET',
            headers:{
                "x-token": token
            }
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