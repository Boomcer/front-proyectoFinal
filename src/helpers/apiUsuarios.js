const url = "https://backend-proyectofinal-rolling.onrender.com/api/usuarios";

const getUsuario = async (uid) =>{
    console.log("Fetching user with UID:", uid);
    const resp = await fetch(url + "/" + uid, {  
        method: "GET",
        headers: {
            "Content-type": "aplication/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
        
    });
    const data = await resp.json();
    console.log("Response from API:", data);
    return data;
};


const putUsuario = async (uid, datos) =>{
    const resp = await fetch(url + "/" + uid, {
        method: "PUT",
        body: JSON.stringify(datos),
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