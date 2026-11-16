import db from "../db/database.js";

const COLS = "id, label_fr, label_en";

export const listCategories = () =>
  db.prepare(`SELECT ${COLS} FROM categories ORDER BY id`).all();

export function createCategory(c) {
  const { label_fr, label_en } = c;
  const info = db.prepare(
    `INSERT INTO categories (label_fr, label_en) VALUES (@label_fr, @label_en)`
  ).run({ label_fr, label_en });
  return db.prepare(`SELECT ${COLS} FROM categories WHERE id = ?`).get(info.lastInsertRowid);
}