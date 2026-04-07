import { Router } from "express";
import { createStore } from "./store.controller.js";

const router = Router();

// POST /api/store
router.post("/", createStore);

export default router;