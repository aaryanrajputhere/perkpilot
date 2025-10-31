import { Request, Response } from "express";
import mongoose from "mongoose";
import ToolComparisonBlog, {
  IToolComparisonBlog,
  ToolComparisonBlogDocument,
} from "../models/comparision.model";

// GET all comparisons
export const getAllComparisons = async (req: Request, res: Response) => {
  try {
    const { published, limit, page, q } = req.query as any;

    const filter: Record<string, any> = {};
    if (published !== undefined) filter.isPublished = published === "true";
    if (q) {
      // simple text search across indexed text fields
      filter.$text = { $search: String(q) };
    }

    const perPage = Math.max(Number(limit) || 20, 1);
    const currentPage = Math.max(Number(page) || 1, 1);

    const docs = await ToolComparisonBlog.find(filter)
      .sort({ createdAt: -1 })
      .skip(perPage * (currentPage - 1))
      .limit(perPage)
      .exec();

    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comparisons", error });
  }
};

// GET one comparison by ID
export const getComparisonById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid comparison id" });
    }

    const doc: ToolComparisonBlogDocument | null =
      await ToolComparisonBlog.findById(id);
    if (!doc) return res.status(404).json({ message: "Comparison not found" });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comparison", error });
  }
};

// CREATE new comparison
export const createComparison = async (req: Request, res: Response) => {
  try {
    const payload: Partial<IToolComparisonBlog> = req.body;

    // Create using model so mongoose validators run
    const created = await ToolComparisonBlog.create(payload as any);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: "Error creating comparison", error });
  }
};

// UPDATE comparison
export const updateComparison = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid comparison id" });
    }

    const updatedData: Partial<IToolComparisonBlog> = req.body;

    const updated = await ToolComparisonBlog.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated)
      return res.status(404).json({ message: "Comparison not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating comparison", error });
  }
};

// DELETE comparison
export const deleteComparison = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid comparison id" });
    }

    const deleted = await ToolComparisonBlog.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Comparison not found" });
    res.json({ message: "Comparison deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comparison", error });
  }
};

export default {
  getAllComparisons,
  getComparisonById,
  createComparison,
  updateComparison,
  deleteComparison,
};
