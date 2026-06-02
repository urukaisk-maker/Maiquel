import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3000),
  jwtSecret: process.env.JWT_SECRET ?? "cambia-este-secreto",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://127.0.0.1:5500"
};
