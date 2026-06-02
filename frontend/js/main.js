import {
  apiActualizarTarea,
  apiCrearTarea,
  apiEliminarTarea,
  apiLogin,
  apiRegistro,
  apiTareas
} from "./modules/api.js";
import { currentPath, go } from "./modules/router.js";
import { clearSession, setSession, setTasks, state } from "./modules/state.js";
import { clearMessage, escapeHtml, showMessage } from "./modules/ui.js";

const app = document.querySelector("#app");

function render() {
  const path = currentPath();
  if (!state.token || !state.usuario) {
    renderAuth();
    return;
  }

  if (path !== "/") {
    go("/");
    return;
  }
  renderDashboard();
}

function renderAuth() {
  app.innerHTML = `
    <section class="auth tarjeta">
      <div>
        <h1>Bienvenido a Maiquel</h1>
        <p>Gestiona tus tareas con una experiencia moderna, rapida y en espanol.</p>
        <div class="bloque">
          <h3>Iniciar sesion</h3>
          <form id="form-login">
            <label for="login-email">Correo electronico</label>
            <input id="login-email" name="email" type="email" required />

            <label for="login-password">Contrasena</label>
            <input id="login-password" name="password" type="password" required minlength="6" />
            <button class="btn" type="submit">Entrar</button>
            <p id="login-msg" class="mensaje"></p>
          </form>
        </div>
      </div>
      <div>
        <div class="bloque">
          <h3>Crear cuenta</h3>
          <form id="form-register">
            <label for="reg-nombre">Nombre</label>
            <input id="reg-nombre" name="nombre" required minlength="2" />

            <label for="reg-email">Correo electronico</label>
            <input id="reg-email" name="email" type="email" required />

            <label for="reg-password">Contrasena</label>
            <input id="reg-password" name="password" type="password" required minlength="6" />
            <button class="btn" type="submit">Registrarme</button>
            <p id="register-msg" class="mensaje"></p>
          </form>
        </div>
      </div>
    </section>
  `;

  document.querySelector("#form-login").addEventListener("submit", onLogin);
  document.querySelector("#form-register").addEventListener("submit", onRegister);
}

function renderDashboard() {
  app.innerHTML = `
    <section class="tarjeta panel">
      <header class="encabezado">
        <div>
          <h2>Panel de tareas</h2>
          <p class="nombre-usuario">Hola, ${escapeHtml(state.usuario.nombre)}</p>
        </div>
        <button id="btn-salir" class="btn-secundario">Cerrar sesion</button>
      </header>

      <div class="bloque">
        <h3>Nueva tarea</h3>
        <form id="form-tarea">
          <label for="tarea-titulo">Titulo</label>
          <input id="tarea-titulo" name="titulo" required minlength="3" />

          <label for="tarea-descripcion">Descripcion</label>
          <textarea id="tarea-descripcion" name="descripcion" rows="3"></textarea>

          <label for="tarea-prioridad">Prioridad</label>
          <select id="tarea-prioridad" name="prioridad">
            <option value="baja">Baja</option>
            <option value="media" selected>Media</option>
            <option value="alta">Alta</option>
          </select>

          <button class="btn" type="submit">Crear tarea</button>
          <p id="task-msg" class="mensaje"></p>
        </form>
      </div>

      <div id="lista-tareas" class="contenedor-tareas"></div>
    </section>
  `;

  document.querySelector("#btn-salir").addEventListener("click", () => {
    clearSession();
    go("/login");
  });
  document.querySelector("#form-tarea").addEventListener("submit", onCreateTask);
  renderTaskList();
}

function renderTaskList() {
  const list = document.querySelector("#lista-tareas");
  if (!state.tareas.length) {
    list.innerHTML = `<div class="vacio">Aun no tienes tareas. Crea la primera arriba.</div>`;
    return;
  }

  list.innerHTML = state.tareas
    .map(
      (tarea) => `
      <article class="tarea">
        <header>
          <h3>${escapeHtml(tarea.titulo)}</h3>
          <div class="meta">
            <span class="chip ${tarea.prioridad}">${escapeHtml(tarea.prioridad)}</span>
            ${tarea.completada ? `<span class="chip">Completada</span>` : ""}
          </div>
        </header>
        <p>${escapeHtml(tarea.descripcion || "Sin descripcion")}</p>
        <div class="acciones">
          <button class="btn-secundario" data-action="toggle" data-id="${tarea.id}">
            ${tarea.completada ? "Marcar pendiente" : "Marcar completada"}
          </button>
          <button class="btn-peligro" data-action="delete" data-id="${tarea.id}">Eliminar</button>
        </div>
      </article>
    `
    )
    .join("");

  list.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", onTaskAction);
  });
}

async function onRegister(event) {
  event.preventDefault();
  clearMessage("#register-msg");
  const form = new FormData(event.currentTarget);
  try {
    const data = await apiRegistro({
      nombre: String(form.get("nombre")),
      email: String(form.get("email")),
      password: String(form.get("password"))
    });
    setSession(data.token, data.usuario);
    await fetchTasks();
    go("/");
  } catch (error) {
    showMessage("#register-msg", error.message, "error");
  }
}

async function onLogin(event) {
  event.preventDefault();
  clearMessage("#login-msg");
  const form = new FormData(event.currentTarget);
  try {
    const data = await apiLogin({
      email: String(form.get("email")),
      password: String(form.get("password"))
    });
    setSession(data.token, data.usuario);
    await fetchTasks();
    go("/");
  } catch (error) {
    showMessage("#login-msg", error.message, "error");
  }
}

async function onCreateTask(event) {
  event.preventDefault();
  clearMessage("#task-msg");
  const form = new FormData(event.currentTarget);
  try {
    await apiCrearTarea(state.token, {
      titulo: String(form.get("titulo")),
      descripcion: String(form.get("descripcion")),
      prioridad: String(form.get("prioridad"))
    });
    event.currentTarget.reset();
    await fetchTasks();
    showMessage("#task-msg", "Tarea creada correctamente.", "ok");
  } catch (error) {
    showMessage("#task-msg", error.message, "error");
  }
}

async function onTaskAction(event) {
  const id = event.currentTarget.dataset.id;
  const action = event.currentTarget.dataset.action;
  if (!id || !action) return;

  try {
    if (action === "delete") {
      await apiEliminarTarea(state.token, id);
    }
    if (action === "toggle") {
      const task = state.tareas.find((item) => item.id === id);
      if (!task) return;
      await apiActualizarTarea(state.token, id, {
        completada: !task.completada
      });
    }
    await fetchTasks();
  } catch (error) {
    alert(error.message);
  }
}

async function fetchTasks() {
  if (!state.token) return;
  try {
    const data = await apiTareas(state.token);
    setTasks(data.tareas ?? []);
  } catch {
    clearSession();
  }
}

window.addEventListener("popstate", render);
window.addEventListener("app:navigate", render);

(async function init() {
  if (state.token) {
    await fetchTasks();
  }
  if (!state.token && currentPath() !== "/login") {
    go("/login");
    return;
  }
  render();
})();
