const url = "https://backend-proyectofinal-rolling.onrender.com/api/usuarios/";



const getUsuario = async (id) =>{
    const resp = await fetch(url + "/" + id, {
        method: "GET",
        headers: {
            "Content-type": "aplication/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
    });
    const data = await resp.json();
    return data;
};


const putUsuario = async (id) =>{
    const resp = await fetch(url + "/" + id, {
        method: "PUT",
        headers: {
            "Content-type": "aplication/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
    });
    const data = await resp.json();
    return data;
};

export {putUsuario,
        getUsuario};