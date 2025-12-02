import express from "express";
import {
  getHomePage,
  updateHomePage,
  updateHomePageSection,
  resetHomePage,
} from "../controllers/homepage.controller.js";
import { requireAuth, checkAdminAccess } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getHomePage);

router.put("/", requireAuth, checkAdminAccess, updateHomePage);

router.patch("/:section", requireAuth, checkAdminAccess, updateHomePageSection);

router.delete("/", requireAuth, checkAdminAccess, resetHomePage);

export default router;
