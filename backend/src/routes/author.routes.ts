import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author.controller.js';
import { requireAuth, checkAdminAccess } from "../middleware/auth.middleware.js";

const router = express.Router();

// Collection routes
// GET all authors
router.get("/", getAllAuthors);

// POST create a new author
router.post("/", requireAuth, checkAdminAccess, createAuthor);

// ID-based routes (param) - declared after specific routes
// GET a single author by ID
router.get("/:id", getAuthorById);

// PUT update an existing author
router.put("/:id", requireAuth, checkAdminAccess, updateAuthor);

// DELETE an author
router.delete("/:id", requireAuth, checkAdminAccess, deleteAuthor);

export default router;
