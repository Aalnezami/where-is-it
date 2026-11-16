import { Router } from "express";
import { listCategories, listCities, listColors } from "../controllers/reference.controller.js";

const router = Router();
router.get("/categories", listCategories);           // GET    /api/categories      : liste
router.get("/colors", listColors);          // GET    /api/colors          : liste
router.get("/cities", listCities);          // GET    /api/cities          : liste

export default router;