import { Router } from "express";
import { list, get, first3 } from "../controllers/items.controller.js";

const router = Router();

router.get("/", list);           // GET    /api/items      : liste
router.get("/first3", first3);  // les 3 annonces le plus récentes
router.get("/:id", get);         // GET    /api/items/3    : une annonce
// router.post("/", create);        // POST   /api/items      : publier
// router.put("/:id", update);      // PUT    /api/items/3    : modifier
// router.delete("/:id", remove);   // DELETE /api/items/3    : supprimer

export default router;