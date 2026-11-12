import { Router } from "express";
import { register } from "../controllers/users.controller.js";

const router = Router();
router.post("/", register);      // POST /api/users : créer un compte

export default router;