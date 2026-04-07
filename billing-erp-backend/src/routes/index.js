import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import storeRoutes from "../modules/store/store.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import prisma from "../config/prisma.js";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Store routes
router.use("/stores", storeRoutes);

// ✅ FINAL HEALTH ROUTE (REAL DB CHECK)
router.get("/health", async (req, res) => {
  try {
    // 🔥 FORCE REAL DB QUERY (NOT just connect)
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

// Protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user
  });
});

export default router;