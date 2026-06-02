import { Router } from "express";
import {
  addTaskController,
  editTaskController,
  listTasksController,
  removeTaskController
} from "../controllers/task.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

export const taskRoutes = Router();

taskRoutes.use(requireAuth);
taskRoutes.get("/", listTasksController);
taskRoutes.post("/", addTaskController);
taskRoutes.put("/:id", editTaskController);
taskRoutes.delete("/:id", removeTaskController);
