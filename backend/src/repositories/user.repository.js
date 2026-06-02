import { readJson, writeJson } from "../data/database.js";
import { usersFile } from "../data/paths.js";

export async function getUsers() {
  return readJson(usersFile);
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function createUser(user) {
  const users = await getUsers();
  users.push(user);
  await writeJson(usersFile, users);
  return user;
}
