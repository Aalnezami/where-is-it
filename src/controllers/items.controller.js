import * as items from "../services/items.service.js";

const notFound = res => res.status(404).json({ error: "Annonce introuvable" });

/**
 * Recherche d'annonces selon les critères passés en query string
 * @param {*} req 
 * @param {*} res 
 */
// Transforme "3" en 3, et tout ce qui n'est pas un entier positif en undefined
const toInt = v => { const n = Number.parseInt(v, 10); return n > 0 ? n : undefined; };

export function list(req, res) {
  const { type_id, category_id, city_id, color_id, q, page, limit } = req.query;
  res.json(items.searchItems({
    type_id: toInt(type_id), category_id: toInt(category_id),
    city_id: toInt(city_id), color_id: toInt(color_id),
    q: typeof q === "string" && q.trim() ? q.trim() : undefined,
    page: toInt(page) ?? 1,
    limit: Math.min(toInt(limit) ?? 9, 50)     // plafond : on ne renvoie jamais toute la base
  }));
}

export function get(req, res) {
  const item = items.getItem(req.params.id);
  item ? res.json(item) : notFound(res);
}

export const first3 = (req, res) => res.json(items.first3());

// export function create(req, res) {
//   const b = req.body;
//   if (!b.user_id || !b.title || !b.place || !b.city_id || !b.date ||
//       !TYPES.includes(b.type_id) || !CATS.includes(b.category_id) || !COLORS.includes(b.color_id))
//     return res.status(400).json({ error: "Champs manquants ou invalides" });

//   try {
//     res.status(201).json(items.createItem(b));
//   } catch (e) {
//     if (e.code === "SQLITE_CONSTRAINT_FOREIGNKEY") return res.status(400).json({ error: "Utilisateur inconnu" });
//     throw e;
//   }
// }

// export function update(req, res) {
//   if (!items.getItem(req.params.id)) return notFound(res);
//   try {
//     res.json(items.updateItem(req.params.id, req.body));
//   } catch (e) {
//     if (e.code === "SQLITE_CONSTRAINT_CHECK") return res.status(400).json({ error: "Valeur non autorisée" });
//     throw e;
//   }
// }

// export function remove(req, res) {
//   items.deleteItem(req.params.id) ? res.status(204).end() : notFound(res);
// }