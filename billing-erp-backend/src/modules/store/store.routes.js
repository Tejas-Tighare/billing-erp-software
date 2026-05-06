import express from "express";
import {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  toggleStoreStatus,
  updateStoreLegal
} from "./store.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createStoreSchema,
  updateStoreSchema,
  updateLegalSchema
} from "./store.validation.js";

const router = express.Router();

// 🔥 CREATE
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  validate(createStoreSchema),
  createStore
);

// 🔥 GET ALL
router.get(
  "/",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getStores
);

// 🔥 GET ONE
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getStoreById
);

// 🔥 UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  validate(updateStoreSchema),
  updateStore
);

// 🔥 TOGGLE STATUS
router.patch(
  "/:id/toggle-status",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  toggleStoreStatus
);

// 🔥 UPDATE LEGAL
router.put(
  "/:id/legal",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  validate(updateLegalSchema),
  updateStoreLegal
);

export default router;