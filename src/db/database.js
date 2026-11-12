// Ouvre ou crée la base et applique le schéma. Le reste du code fait : import db from "./db/database.js"
import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dbPath = fileURLToPath(new URL("../../where-is-it.db", import.meta.url));
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");   // meilleures performances en lecture/écriture
db.pragma("foreign_keys = ON");    // IMPORTANT : SQLite ne vérifie pas les clés étrangères sans ça

db.exec(readFileSync(new URL("./schema.sql", import.meta.url), "utf8"));

export default db;
