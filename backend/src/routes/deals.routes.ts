import express from "express";
import {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
  getStats,
  updateStats,
} from "../controllers/deals.controller.js";
import { requireAuth, checkAdminAccess } from "../middleware/auth.middleware.js";

const router = express.Router();

// Collection routes
// GET all deals or deal page (if ?page=true)
router.get("/", getAllDeals);

// Stats routes must be before param routes
router.get("/stats", getStats);
router.put("/stats", requireAuth, checkAdminAccess, updateStats);

// POST create a new deal or update deal page (if ?page=true)
router.post("/", requireAuth, checkAdminAccess, createDeal);

// PUT update deal page (if ?page=true) - must be before /:id route
router.put("/", requireAuth, checkAdminAccess, updateDeal);

// ID-based routes (param) - declared after specific routes
// GET a single deal by ID
router.get("/:id", getDealById);

// PUT update an existing deal by ID
router.put("/:id", requireAuth, checkAdminAccess, updateDeal);

// DELETE a deal
router.delete("/:id", requireAuth, checkAdminAccess, deleteDeal);

export default router;
