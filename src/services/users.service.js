import bcrypt from "bcryptjs";
import db from "../db/database.js";

// Crée un compte. Le mot de passe est haché (empreinte), jamais stocké en clair.
export function createUser({ name, email, password }) {
  const hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email, hash);
  return { id: info.lastInsertRowid, name, email };   // on ne renvoie jamais le hash
}