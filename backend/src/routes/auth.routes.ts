import express from "express";
import { createUser, login, checkAuth } from "../controllers/auth.controller.js";
import { requireAuth, checkAdminAccess } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * POST /api/auth/login
 * Login user (Public endpoint)
 */
router.post("/login", login);

/**
 * POST /api/auth/create-user
 * Create a new user (Admin only)
 * Only existing admins can create new users
 */
router.post("/create-user", requireAuth, checkAdminAccess, createUser);

/**
 * GET /api/auth/check
 * Check if the current user is authenticated and return their admin status
 * Returns the user's email and isAdmin flag
 * Accessible to any authenticated user (not admin-only)
 */
router.get("/check", requireAuth, checkAuth);

export default router;
