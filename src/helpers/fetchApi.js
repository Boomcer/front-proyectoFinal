const url = import.meta.env.VITE_API_URL + "/api/";

const auth = async (email, password) => {
  const resp = await fetch(url + "auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await resp.json();
  return data;
};

export { auth };
