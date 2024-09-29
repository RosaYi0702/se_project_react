const BASE_URL = "http://localhost:3000/";

export function signup(name, avatar, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((error) => {
      console.error("Error during signup:", error);
    });
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error:${res.status}`);
      }
      return res.json().then((data) => {
        localStorage.setItem("jwt", data.token);
        console.log(data);
        return data;
      });
    })
    .catch((error) => {
      console.error("Error during sign in:", error);
    });
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((error) => {
      console.error("Error during get User Info:", error);
    });
}
