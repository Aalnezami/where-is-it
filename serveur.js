import express from "express";
import { fileURLToPath } from "node:url";
import usersRoutes from "./src/routes/users.routes.js";
import itemsRoutes from "./src/routes/items.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());                                              // lit le JSON des requêtes (avant les routes)
app.use(express.static(fileURLToPath(new URL("./public", import.meta.url))));  // sert le site (HTML, CSS, JS)

app.use("/api/users", usersRoutes);
app.use("/api/items", itemsRoutes);

// URL inconnue sous /api
app.use("/api", (req, res) => res.status(404).json({ error: "Route introuvable" }));

// Toute erreur non prévue arrive ici (JSON invalide, bug...)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? "Requête invalide" : "Erreur serveur" });
});

app.listen(PORT, () => console.log(`Serveur lancé : http://localhost:${PORT}`));