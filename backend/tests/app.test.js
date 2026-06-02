import request from "supertest";
import { createApp } from "../src/app.js";

describe("API de salud", () => {
  it("responde correctamente en /api/salud", async () => {
    const app = createApp();

    const response = await request(app).get("/api/salud");

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.mensaje).toBe("API funcionando correctamente.");
  });
});
