import { randomUUID } from "crypto";
import { z } from "zod";
import {
  createTask,
  deleteTask,
  findTaskById,
  getTasksByUserId,
  updateTask
} from "../repositories/task.repository.js";

const createTaskSchema = z.object({
  titulo: z.string().min(3, "El titulo debe tener al menos 3 caracteres."),
  descripcion: z.string().max(300, "La descripcion no puede superar 300 caracteres.").optional(),
  prioridad: z.enum(["baja", "media", "alta"]).default("media")
});

const updateTaskSchema = z.object({
  titulo: z.string().min(3).optional(),
  descripcion: z.string().max(300).optional(),
  prioridad: z.enum(["baja", "media", "alta"]).optional(),
  completada: z.boolean().optional()
});

export async function listTasks(userId) {
  const tasks = await getTasksByUserId(userId);
  return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addTask(userId, input) {
  const parsed = createTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 400, error: parsed.error.issues[0].message };
  }

  const task = {
    id: randomUUID(),
    userId,
    titulo: parsed.data.titulo.trim(),
    descripcion: parsed.data.descripcion?.trim() ?? "",
    prioridad: parsed.data.prioridad,
    completada: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await createTask(task);
  return { ok: true, data: task };
}

export async function editTask(userId, taskId, input) {
  const parsed = updateTaskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 400, error: parsed.error.issues[0].message };
  }

  const current = await findTaskById(taskId);
  if (!current || current.userId !== userId) {
    return { ok: false, status: 404, error: "Tarea no encontrada." };
  }

  const updated = await updateTask(taskId, (task) => ({
    ...task,
    ...parsed.data,
    updatedAt: new Date().toISOString()
  }));

  return { ok: true, data: updated };
}

export async function removeTask(userId, taskId) {
  const current = await findTaskById(taskId);
  if (!current || current.userId !== userId) {
    return { ok: false, status: 404, error: "Tarea no encontrada." };
  }

  await deleteTask(taskId);
  return { ok: true };
}
