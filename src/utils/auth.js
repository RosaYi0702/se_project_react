const BASE_URL = "http://localhost:3001";

export function signup(name, avatar, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((errorData) => {
        return Promise.reject(
          new Error(errorData.message || `ERROR: ${res.status}`)
        );
      });
    }
    return res.json();
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

export const updateUser = (token, formData) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error:${res.status}`);
    }
    console.log(res.json);
    return res.json();
  });
};
