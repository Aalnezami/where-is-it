import * as items from "../services/items.service.js";

const TYPES = ["lost", "found"];
const CATS = ["keys", "bags", "phone", "clothes", "docs"];
const COLORS = ["blue", "black", "red", "green", "grey", "brown"];
const notFound = res => res.status(404).json({ error: "Annonce introuvable" });

export const list = (req, res) => res.json(items.listItems());

export function get(req, res) {
  const item = items.getItem(req.params.id);
  item ? res.json(item) : notFound(res);
}

export function create(req, res) {
  const b = req.body;
  if (!b.user_id || !b.title || !b.place || !b.date ||
      !TYPES.includes(b.type) || !CATS.includes(b.category) || !COLORS.includes(b.color))
    return res.status(400).json({ error: "Champs manquants ou invalides" });

  try {
    res.status(201).json(items.createItem(b));
  } catch (e) {
    if (e.code === "SQLITE_CONSTRAINT_FOREIGNKEY") return res.status(400).json({ error: "Utilisateur inconnu" });
    throw e;
  }
}

export function update(req, res) {
  if (!items.getItem(req.params.id)) return notFound(res);
  try {
    res.json(items.updateItem(req.params.id, req.body));
  } catch (e) {
    if (e.code === "SQLITE_CONSTRAINT_CHECK") return res.status(400).json({ error: "Valeur non autorisée" });
    throw e;
  }
}

export function remove(req, res) {
  items.deleteItem(req.params.id) ? res.status(204).end() : notFound(res);
}