import fs from "fs/promises";
import { dataDir, tasksFile, usersFile } from "./paths.js";

async function ensureFile(filePath, defaultData) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf8");
  }
}

export async function initDataLayer() {
  await fs.mkdir(dataDir, { recursive: true });
  await ensureFile(usersFile, []);
  await ensureFile(tasksFile, []);
}

export async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
