import { Router } from "express";
import { register, userLogin } from "../controllers/users.controller.js";

const router = Router();
router.post("/", register);      // POST /api/users : créer un compte
router.post("/login", userLogin); // POST /api/users/login : authentifier

export default router;