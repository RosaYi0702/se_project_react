const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
  });
}

export function postItem(formData) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      imageUrl: formData.imageUrl,
      weather: formData.weather,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
  });
}

export function deleteItem(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
  });
}
