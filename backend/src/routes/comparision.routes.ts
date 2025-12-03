import express from "express";
import {
  createComparison,
  getComparisonById,
  updateComparison,
  deleteComparison,
  getAllComparisons,
  getComparisonPageSettings,
  updateComparisonPageSettings,
} from "../controllers/comparision.controller.js";
import { requireAuth, checkAdminAccess } from "../middleware/auth.middleware.js";

const router = express.Router();

// Collection routes
router.post("/", requireAuth, checkAdminAccess, createComparison);
router.get("/", getAllComparisons);
router.get("/page/settings", getComparisonPageSettings);
router.put("/page/settings", requireAuth, checkAdminAccess, updateComparisonPageSettings);
// Item routes
router.get("/:id", getComparisonById);
router.put("/:id", requireAuth, checkAdminAccess, updateComparison);
router.delete("/:id", requireAuth, checkAdminAccess, deleteComparison);

export default router;
