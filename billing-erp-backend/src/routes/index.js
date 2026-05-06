import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import storeRoutes from "../modules/store/store.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import prisma from "../config/prisma.js";

const router = Router();

// ============================
// AUTH ROUTES
// ============================
router.use("/auth", authRoutes);

// ============================
// STORE ROUTES
// ============================
router.use("/stores", storeRoutes);

// ============================
// HEALTH CHECK (DB + SERVER)
// ============================
router.get("/health", async (req, res) => {
  try {
    // 🔥 FORCE REAL DB QUERY
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "API is healthy",
      services: {
        server: "running",
        database: "connected"
      },
      timestamp: new Date()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "API is unhealthy",
      services: {
        server: "running",
        database: "disconnected"
      },
      error: error.message
    });
  }
});

// ============================
// PROTECTED TEST ROUTE
// ============================
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user
  });
});

export default router;