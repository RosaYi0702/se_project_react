const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems(token) {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((err) => {
      console.error(`ERROR during fetching items: ${err}`);
    });
}

export function postItem(formData, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: formData.name,
      imageUrl: formData.imageUrl,
      weather: formData.weather,
    }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((err) => {
      console.error(`ERROR during fetching items: ${err}`);
    });
}

export function deleteItem(item, token) {
  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((err) => {
      console.error(`ERROR during fetching items: ${err}`);
    });
}
