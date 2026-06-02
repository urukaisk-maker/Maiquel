import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { authRoutes } from "./routes/auth.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { apiRateLimit } from "./middleware/security.middleware.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin
    })
  );
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(apiRateLimit);

  app.get("/api/salud", (req, res) => {
    res.status(200).json({ ok: true, mensaje: "API funcionando correctamente." });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/tareas", taskRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
