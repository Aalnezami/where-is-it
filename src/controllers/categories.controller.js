import * as categories from "../services/categories.service.js";

const notFound = res => res.status(404).json({ error: "Catégorie introuvable" });

export const listCategories = (req, res) => res.json(categories.listCategories());
