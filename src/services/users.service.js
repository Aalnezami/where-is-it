import bcrypt from "bcryptjs";
import db from "../db/database.js";

// Crée un compte. Le mot de passe est haché (empreinte), jamais stocké en clair.
export function createUser({ nom, prenom, email, password }) {
  const hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare("INSERT INTO users (nom, prenom, email, password_hash) VALUES (?, ?, ?, ?)")
    .run(nom, prenom, email, hash);
  return { id: info.lastInsertRowid, nom, prenom, email };   // on ne renvoie jamais le hash
}