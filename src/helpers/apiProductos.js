const urlProductos = import.meta.env.VITE_API_URL + "/api/productos?desde=0";
const urlProducto = import.meta.env.VITE_API_URL + "/api/productos";

const getProductos = async () => {
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

const destacados = async () => {
  const response = await fetch(urlProductos, {
    method: "GET",
  });

  const data = await response.json();
  const destacados = data.productos.filter((producto) => producto.destacado);
  return destacados;
};

const getProducto = async (id) => {
  const resp = await fetch(urlProducto + "/" + id, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("token")),
    },
  });

  const data = await resp.json();
  return data;
};


export { getProductos, destacados, getProducto };
