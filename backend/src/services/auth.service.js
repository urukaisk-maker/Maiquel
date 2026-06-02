import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { z } from "zod";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";
import { env } from "../config/env.js";

const authSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Debes introducir un correo valido."),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres.")
});

const loginSchema = z.object({
  email: z.string().email("Debes introducir un correo valido."),
  password: z.string().min(1, "La contrasena es obligatoria.")
});

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      nombre: user.nombre,
      email: user.email
    },
    env.jwtSecret,
    { expiresIn: "2h" }
  );
}

export async function register(input) {
  const parsed = authSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 400, error: parsed.error.issues[0].message };
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    return { ok: false, status: 409, error: "Este correo ya esta registrado." };
  }

  const hash = await bcrypt.hash(parsed.data.password, 10);
  const user = {
    id: randomUUID(),
    nombre: parsed.data.nombre.trim(),
    email: parsed.data.email.toLowerCase(),
    passwordHash: hash,
    createdAt: new Date().toISOString()
  };

  await createUser(user);
  const token = signToken(user);

  return {
    ok: true,
    data: {
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    }
  };
}

export async function login(input) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 400, error: parsed.error.issues[0].message };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user) {
    return { ok: false, status: 401, error: "Credenciales invalidas." };
  }

  const match = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!match) {
    return { ok: false, status: 401, error: "Credenciales invalidas." };
  }

  const token = signToken(user);

  return {
    ok: true,
    data: {
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    }
  };
}
