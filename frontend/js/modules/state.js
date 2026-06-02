const initialState = {
  token: localStorage.getItem("token") ?? "",
  usuario: JSON.parse(localStorage.getItem("usuario") ?? "null"),
  tareas: []
};

export const state = structuredClone(initialState);

export function setSession(token, usuario) {
  state.token = token;
  state.usuario = usuario;
  localStorage.setItem("token", token);
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

export function clearSession() {
  state.token = "";
  state.usuario = null;
  state.tareas = [];
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export function setTasks(tareas) {
  state.tareas = tareas;
}
