import db from "../db/database.js";

const COLS = "id, label_fr, label_en";
const COLS_CITY = "id, name, postal_code";
const COLS_COLOR = "id, label_fr, label_en, hex";

export const listCategories = () =>
  db.prepare(`SELECT ${COLS} FROM categories ORDER BY id`).all();

export const listColors = () =>
  db.prepare(`SELECT ${COLS_COLOR} FROM colors ORDER BY id`).all();

export const listCities = () =>
  db.prepare(`SELECT ${COLS_CITY} FROM cities ORDER BY id`).all();