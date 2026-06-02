import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { initDataLayer } from "./data/database.js";

async function bootstrap() {
  await initDataLayer();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Servidor API en http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("No se pudo iniciar el servidor:", error);
  process.exit(1);
});
