import { readJson, writeJson } from "../data/database.js";
import { tasksFile } from "../data/paths.js";

export async function getTasksByUserId(userId) {
  const tasks = await readJson(tasksFile);
  return tasks.filter((task) => task.userId === userId);
}

export async function findTaskById(taskId) {
  const tasks = await readJson(tasksFile);
  return tasks.find((task) => task.id === taskId) ?? null;
}

export async function createTask(task) {
  const tasks = await readJson(tasksFile);
  tasks.push(task);
  await writeJson(tasksFile, tasks);
  return task;
}

export async function updateTask(taskId, updater) {
  const tasks = await readJson(tasksFile);
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    return null;
  }

  tasks[index] = updater(tasks[index]);
  await writeJson(tasksFile, tasks);
  return tasks[index];
}

export async function deleteTask(taskId) {
  const tasks = await readJson(tasksFile);
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  await writeJson(tasksFile, tasks);
  return true;
}
