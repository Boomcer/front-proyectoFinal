const urlUsuario = "https://backend-proyectofinal-rolling.onrender.com/api/usuarios"


export const getUsuarios = async () => {
    const resp = await fetch(urlProductos, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
    });

    const data = await resp.json();

    return data;
};




export const getUserById = async (uid) => {
    const response = await fetch(`https://backend-proyectofinal-rolling.onrender.com/api/usuarios/673782a061200afc461fd6f8`);
    console.log(response);
    return response.json();
  };

  export const getUsuario = async (uid) => {

    const resp = await fetch(urlUsuario + "/" + uid, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": JSON.parse(localStorage.getItem("token")),
        },
    });

        const data = await resp.json();
        console.log(resp)
    
        return data;
    };
  
  export const updateFavoritos = async (_id, favoritos) => {
    await fetch(`https://backend-proyectofinal-rolling.onrender.com/api/usuarios${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token'),
      },
      body: JSON.stringify([ favoritos] ),
    });
  };
  