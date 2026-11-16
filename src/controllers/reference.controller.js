import * as categories from "../services/reference.service.js";

const notFound = res => res.status(404).json({ error: "Référence introuvable" });

export const listCategories = (req, res) => res.json(categories.listCategories());
export const listColors = (req, res) => res.json(categories.listColors());
export const listCities = (req, res) => res.json(categories.listCities());