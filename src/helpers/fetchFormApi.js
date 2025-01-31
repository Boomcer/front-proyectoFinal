const url = import.meta.env.VITE_API_URL + "/api/";

const alta = async (datos) => {
  const resp = await fetch(url + "usuarios", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await resp.json();
  console.log(data);
  return data;
};

const login = async (email, password) => {
  const resp = await fetch(url + "auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await resp.json();
  console.log(data);
  return data;
};

export { alta, login };
