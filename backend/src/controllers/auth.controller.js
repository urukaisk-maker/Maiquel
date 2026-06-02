import { login, register } from "../services/auth.service.js";

export async function registerController(req, res) {
  const result = await register(req.body);
  if (!result.ok) {
    return res.status(result.status).json({ ok: false, mensaje: result.error });
  }
  return res.status(201).json({ ok: true, ...result.data });
}

export async function loginController(req, res) {
  const result = await login(req.body);
  if (!result.ok) {
    return res.status(result.status).json({ ok: false, mensaje: result.error });
  }
  return res.status(200).json({ ok: true, ...result.data });
}
