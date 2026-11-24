import db from "../db/database.js";

const SELECT = `SELECT items.id, items.user_id,
  items.type_id, itemType.label_fr AS type_fr, itemType.label_en AS type_en, itemType.hex AS type_hex,
  items.title, items.description,
  items.category_id, categories.label_fr AS category_fr, categories.label_en AS category_en,
  items.color_id, colors.label_fr AS color_fr, colors.label_en AS color_en, colors.hex AS color_hex,
  items.place, items.city_id, cities.name AS city, cities.postal_code,
  items.date, items.photo,
  items.status_id, itemStatus.label_fr AS status_fr, itemStatus.label_en AS status_en, itemStatus.hex AS status_hex,
  items.created_at
  FROM items
  JOIN itemType ON itemType.id = items.type_id
  JOIN categories ON categories.id = items.category_id
  JOIN colors ON colors.id = items.color_id
  JOIN cities ON cities.id = items.city_id
  JOIN itemStatus ON itemStatus.id = items.status_id`;

export function searchItems({ type_id, category_id, city_id, color_id, q, page = 1, limit = 9 }) {
  const where = ["items.status_id = 1"];      // 1 = Ouvert
  const params = {};
  if (type_id)     { where.push("items.type_id = @type_id");         params.type_id = type_id; }
  if (category_id) { where.push("items.category_id = @category_id"); params.category_id = category_id; }
  if (city_id)     { where.push("items.city_id = @city_id");         params.city_id = city_id; }
  if (color_id)    { where.push("items.color_id = @color_id");       params.color_id = color_id; }
  if (q)           { where.push("(items.title LIKE @q OR items.description LIKE @q)"); params.q = `%${q}%`; }

  const clause = "WHERE " + where.join(" AND ");
  const total = db.prepare(`SELECT COUNT(*) AS n FROM items ${clause}`).get(params).n;
  const items = db.prepare(`${SELECT} ${clause} ORDER BY items.date DESC, items.id DESC LIMIT @limit OFFSET @offset`)
                  .all({ ...params, limit, offset: (page - 1) * limit });

  return { items, page, limit, total, totalPages: Math.ceil(total / limit) };
}

// export const listItems = () =>
//   db.prepare(`SELECT ${COLS} FROM items ORDER BY date DESC, id DESC`).all();

// export const getItem = id =>
//   db.prepare(`SELECT ${COLS} FROM items WHERE id = ?`).get(id);

// export function createItem(i) {
//   const { user_id, type_id, title, description = null, category_id, color_id, place, city_id, date } = i;
// const info = db.prepare(
//   `INSERT INTO items (user_id, type_id, title, description, category_id, color_id, place, city_id, date)
//    VALUES (@user_id, @type_id, @title, @description, @category_id, @color_id, @place, @city_id, @date)`
// ).run({ user_id, type_id, title, description, category_id, color_id, place, city_id, date });
//   return getItem(info.lastInsertRowid);
// }

// // Modification partielle : un champ absent (null) garde sa valeur actuelle grâce à COALESCE
// export function updateItem(id, f) {
//   const { title = null, description = null, category_id = null, color_id = null, place = null, city_id = null, date = null, status = null } = f;
//   db.prepare(
//     `UPDATE items SET title = COALESCE(@title, title), description = COALESCE(@description, description),
//        category_id = COALESCE(@category_id, category_id), color_id = COALESCE(@color_id, color_id),
//        place = COALESCE(@place, place), city_id = COALESCE(@city_id, city_id), date = COALESCE(@date, date), status = COALESCE(@status, status)
//      WHERE id = @id`
//   ).run({ title, description, category_id, color_id, place, city_id , date, status, id });
//   return getItem(id);
// }

// export const deleteItem = id =>
//   db.prepare("DELETE FROM items WHERE id = ?").run(id).changes > 0;
