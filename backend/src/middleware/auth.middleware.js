import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization ?? "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, mensaje: "No autorizado." });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = {
      id: payload.sub,
      nombre: payload.nombre,
      email: payload.email
    };
    return next();
  } catch {
    return res.status(401).json({ ok: false, mensaje: "Token invalido o expirado." });
  }
}
