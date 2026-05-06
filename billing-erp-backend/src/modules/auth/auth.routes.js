import express from "express";
import { login, getMe } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema } from "./auth.validation.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, getMe);

export default router;