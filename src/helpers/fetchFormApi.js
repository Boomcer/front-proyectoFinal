const url = "https://backend-proyectofinal-rolling.onrender.com/api/";


const alta = async (nombre, email, password, rol) =>{
    const resp = await fetch(url + "/usuarios", {
        method: "POST",
        body: JSON.stringify({nombre, email, password, rol}),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }
    );
    const data = await resp.json();
    return data;
};
export { alta };
