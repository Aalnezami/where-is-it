import db from "../db/database.js";

const COLS = "id, user_id, type, title, description, category, color, place, date, photo, status, created_at";

export const listItems = () =>
  db.prepare(`SELECT ${COLS} FROM items ORDER BY date DESC, id DESC`).all();

export const getItem = id =>
  db.prepare(`SELECT ${COLS} FROM items WHERE id = ?`).get(id);

export function createItem(i) {
  const { user_id, type, title, description = null, category, color, place, date } = i;
  const info = db.prepare(
    `INSERT INTO items (user_id, type, title, description, category, color, place, date)
     VALUES (@user_id, @type, @title, @description, @category, @color, @place, @date)`
  ).run({ user_id, type, title, description, category, color, place, date });
  return getItem(info.lastInsertRowid);
}

// Modification partielle : un champ absent (null) garde sa valeur actuelle grâce à COALESCE
export function updateItem(id, f) {
  const { title = null, description = null, category = null, color = null, place = null, date = null, status = null } = f;
  db.prepare(
    `UPDATE items SET title = COALESCE(@title, title), description = COALESCE(@description, description),
       category = COALESCE(@category, category), color = COALESCE(@color, color),
       place = COALESCE(@place, place), date = COALESCE(@date, date), status = COALESCE(@status, status)
     WHERE id = @id`
  ).run({ title, description, category, color, place, date, status, id });
  return getItem(id);
}

export const deleteItem = id =>
  db.prepare("DELETE FROM items WHERE id = ?").run(id).changes > 0;