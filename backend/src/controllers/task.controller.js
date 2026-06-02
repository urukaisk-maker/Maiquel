import { addTask, editTask, listTasks, removeTask } from "../services/task.service.js";

export async function listTasksController(req, res) {
  const tasks = await listTasks(req.user.id);
  return res.status(200).json({ ok: true, tareas: tasks });
}

export async function addTaskController(req, res) {
  const result = await addTask(req.user.id, req.body);
  if (!result.ok) {
    return res.status(result.status).json({ ok: false, mensaje: result.error });
  }
  return res.status(201).json({ ok: true, tarea: result.data });
}

export async function editTaskController(req, res) {
  const result = await editTask(req.user.id, req.params.id, req.body);
  if (!result.ok) {
    return res.status(result.status).json({ ok: false, mensaje: result.error });
  }
  return res.status(200).json({ ok: true, tarea: result.data });
}

export async function removeTaskController(req, res) {
  const result = await removeTask(req.user.id, req.params.id);
  if (!result.ok) {
    return res.status(result.status).json({ ok: false, mensaje: result.error });
  }
  return res.status(200).json({ ok: true, mensaje: "Tarea eliminada correctamente." });
}
