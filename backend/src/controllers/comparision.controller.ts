import { Request, Response } from "express";
import mongoose from "mongoose";
import ToolComparisonBlog, {
  IToolComparisonBlog,
  ToolComparisonBlogDocument,
} from "../models/comparision.model.js";
import ComparisonPageSettings from "../models/comparisonPageSettings.model.js";
import {
  ComparisonQueryParams,
  MongoTextSearchFilter,
  type ComparisonPageSettingsBody,
} from "../types/index.js";

// GET all comparisons
export const getAllComparisons = async (req: Request, res: Response) => {
  try {
    const { published, limit, page, q } = req.query as ComparisonQueryParams;

    const filter: Record<string, boolean | MongoTextSearchFilter> = {};
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

export const getComparisonPageSettings = async (req: Request, res: Response) => {
  try {
    const singletonValue = "comparison-page-settings";

    const settings = await ComparisonPageSettings.findOneAndUpdate(
      {},
      {
        $set: { singletonKey: singletonValue },
        $setOnInsert: {},
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).populate("featuredComparisons");

    if (!settings) {
      return res
        .status(500)
        .json({ message: "Unable to load comparison page settings" });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comparison page settings", error });
  }
};

export const updateComparisonPageSettings = async (
  req: Request<unknown, unknown, ComparisonPageSettingsBody>,
  res: Response
) => {
  try {
    const payload = req.body || {};

    const update = {
      comparisonPageStatus: payload.comparisonPageStatus ?? "live",
      comparisonPageTopTagline: payload.comparisonPageTopTagline ?? "",
      comparisonPageHeading: payload.comparisonPageHeading ?? "",
      comparisonPageSubheading: payload.comparisonPageSubheading ?? "",
      comparisonPageTags: payload.comparisonPageTags ?? [],
      featuredComparisons: payload.featuredComparisons ?? [],
    };

    const settings = await ComparisonPageSettings.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    }).populate("featuredComparisons");

    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: "Error updating comparison page settings", error });
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
      await ToolComparisonBlog.findById(id).populate({
        path: "moreComparisons",
        select: "heroHeading heroBody comparisonHeroImage slug toolsMentioned blogCategory readingTime _id",
      });
    if (!doc) return res.status(404).json({ message: "Comparison not found" });
    

    if (doc.moreComparisons && !Array.isArray(doc.moreComparisons)) {
      doc.moreComparisons = [];
    }
    
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
    const created = await ToolComparisonBlog.create(payload);
    await created.populate({
      path: "moreComparisons",
      select: "heroHeading heroBody comparisonHeroImage slug toolsMentioned blogCategory readingTime _id",
    });
    
    // Ensure moreComparisons is an array
    if (created.moreComparisons && !Array.isArray(created.moreComparisons)) {
      created.moreComparisons = [];
    }

    res.status(201).json(created);
  } catch (error) {
    console.error("=== CREATE ERROR ===", error);
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
    ).populate({
      path: "moreComparisons",
      select: "heroHeading heroBody comparisonHeroImage slug toolsMentioned blogCategory readingTime _id",
    });

    if (!updated)
      return res.status(404).json({ message: "Comparison not found" });

    // Ensure moreComparisons is an array
    if (updated.moreComparisons && !Array.isArray(updated.moreComparisons)) {
      updated.moreComparisons = [];
    }

    res.json(updated);
  } catch (error) {
    console.error("=== UPDATE ERROR ===", error);
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
  getComparisonPageSettings,
  updateComparisonPageSettings,
  getComparisonById,
  createComparison,
  updateComparison,
  deleteComparison,
};
