import { createUser } from "../services/users.service.js";

export function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 8)
    return res.status(400).json({ error: "name, email et password (8 caractères min.) sont requis" });

  try {
    res.status(201).json(createUser({ name, email, password }));
  } catch (e) {
    if (e.code === "SQLITE_CONSTRAINT_UNIQUE")
      return res.status(409).json({ error: "Cet e-mail est déjà utilisé" });
    throw e;
  }
}