import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dataDir = path.resolve(__dirname, "../../data");
export const usersFile = path.resolve(dataDir, "usuarios.json");
export const tasksFile = path.resolve(dataDir, "tareas.json");
