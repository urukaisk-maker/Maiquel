const API_URL = "http://localhost:3000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.mensaje ?? "Error inesperado de la API.");
  }
  return data;
}

export function apiRegistro(payload) {
  return request("/auth/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export function apiLogin(payload) {
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export function apiTareas(token) {
  return request("/tareas", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function apiCrearTarea(token, payload) {
  return request("/tareas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function apiActualizarTarea(token, id, payload) {
  return request(`/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function apiEliminarTarea(token, id) {
  return request(`/tareas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}
