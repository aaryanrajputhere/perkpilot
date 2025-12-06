import { Request, Response } from "express";
import mongoose from "mongoose";
import Review from "../models/reviews.model.js";
import type {
  IReview,
  ReviewQueryParams,
  ReviewCreateBody,
  ReviewUpdateBody,
  ReviewPageSettingsBody,
} from "../types/review.types.js";
import type {
  MongoRegexFilter,
  PaginatedResponse,
  ErrorResponse,
} from "../types/index.js";

// GET all reviews with pagination and filtering
export const getAllReviews = async (
  req: Request<unknown, PaginatedResponse<IReview> | ErrorResponse, unknown, ReviewQueryParams>,
  res: Response<PaginatedResponse<IReview> | ErrorResponse>
) => {
  try {
    const {
      page = 1,
      limit = 20,
      productName,
      sortBy = "-createdAt",
    } = req.query as ReviewQueryParams;

    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.max(Number(limit) || 20, 1);
    const skip = (pageNum - 1) * limitNum;

    const filter: Record<string, MongoRegexFilter | { $ne: boolean }> = {
      isReviewPageSettings: { $ne: true },
    };
    if (productName) {
      filter.productName = { $regex: productName, $options: "i" };
    }

    const reviews = await Review.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum)
      .exec();

    const total = await Review.countDocuments(filter);

    res.json({
      data: reviews,
      pagination: {
        current: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Error fetching reviews", error: errorMessage });
  }
};

export const getReviewPageSettings = async (
  req: Request,
  res: Response<IReview | ErrorResponse>
) => {
  try {
    let reviewPage = await Review.findOne({
      isReviewPageSettings: true,
    }).populate("featuredReviews");

    if (!reviewPage) {
      reviewPage = await Review.create({
        productName: "__review_page_settings__",
        isReviewPageSettings: true,
        reviewPageStatus: "live",
        reviewPageTopTagline: "For Software Reviews",
        reviewPageHeading: "Software Reviews",
        reviewPageSubheading:
          "Honest, in-depth reviews of the software tools that matter.",
        reviewPageTags: [],
        featuredReviews: [],
      });
      reviewPage = await reviewPage.populate("featuredReviews");
    }

    res.json(reviewPage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Error fetching review page", error: errorMessage });
  }
};

export const updateReviewPageSettings = async (
  req: Request<unknown, IReview | ErrorResponse, ReviewPageSettingsBody>,
  res: Response<IReview | ErrorResponse>
) => {
  try {
    const payload: ReviewPageSettingsBody = req.body || {};

    const update = {
      reviewPageStatus: payload.reviewPageStatus ?? "live",
      reviewPageTopTagline: payload.reviewPageTopTagline ?? "",
      reviewPageHeading: payload.reviewPageHeading ?? "",
      reviewPageSubheading: payload.reviewPageSubheading ?? "",
      reviewPageTags: payload.reviewPageTags ?? [],
      featuredReviews: payload.featuredReviews ?? [],
      isReviewPageSettings: true,
      productName: "__review_page_settings__",
    };

    const reviewPage = await Review.findOneAndUpdate(
      { isReviewPageSettings: true },
      update,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    ).populate("featuredReviews");

    res.json(reviewPage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res
      .status(400)
      .json({ message: "Error updating review page", error: errorMessage });
  }
};

// GET review by ID
export const getReviewById = async (
  req: Request<{ id: string }, IReview | ErrorResponse>,
  res: Response<IReview | ErrorResponse>
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Error fetching review", error: errorMessage });
  }
};

// CREATE review
export const createReview = async (
  req: Request<unknown, IReview | ErrorResponse, ReviewCreateBody>,
  res: Response<IReview | ErrorResponse>
) => {
  try {
    const payload: ReviewCreateBody = req.body;

    // Validate required fields
    if (!payload.productName || !payload.productName.trim()) {
      return res.status(400).json({
        message: "productName is required and cannot be empty",
      });
    }

    // Validate rating if provided
    if (payload.rating !== undefined) {
      if (typeof payload.rating !== "number" || payload.rating < 1 || payload.rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be a number between 1 and 5" });
      }
    }

    // Validate aggregateRating if provided
    if (payload.aggregateRating !== undefined) {
      if (typeof payload.aggregateRating !== "number" || payload.aggregateRating < 1 || payload.aggregateRating > 5) {
      return res
        .status(400)
          .json({ message: "aggregateRating must be a number between 1 and 5" });
      }
    }

    // Validate nested productReviews ratings if provided
    if (payload.productReviews && Array.isArray(payload.productReviews)) {
      for (let i = 0; i < payload.productReviews.length; i++) {
        const review = payload.productReviews[i];
        if (!review.userName || !review.userName.trim()) {
          return res
            .status(400)
            .json({ message: `productReviews[${i}].userName is required` });
        }
        if (review.rating === undefined || review.rating < 1 || review.rating > 5) {
          return res
            .status(400)
            .json({ message: `productReviews[${i}].rating must be between 1 and 5` });
        }
      }
    }

    // Validate ratingCategories if provided
    if (payload.ratingCategories && Array.isArray(payload.ratingCategories)) {
      for (let i = 0; i < payload.ratingCategories.length; i++) {
        const category = payload.ratingCategories[i];
        if (!category.category || !category.category.trim()) {
          return res
            .status(400)
            .json({ message: `ratingCategories[${i}].category is required` });
        }
        if (category.value === undefined || category.value < 0) {
          return res
            .status(400)
            .json({ message: `ratingCategories[${i}].value must be a non-negative number` });
        }
        if (category.outOf !== undefined && (category.outOf < 1 || category.value > category.outOf)) {
          return res
            .status(400)
            .json({ message: `ratingCategories[${i}].outOf must be at least 1, and value cannot exceed outOf value` });
        }
      }
    }

    // Validate useCases ratings if provided
    if (payload.useCases && Array.isArray(payload.useCases)) {
      for (let i = 0; i < payload.useCases.length; i++) {
        const useCase = payload.useCases[i];
        if (!useCase.title || !useCase.title.trim()) {
          return res
            .status(400)
            .json({ message: `useCases[${i}].title is required` });
        }
        if (useCase.rating !== undefined && (useCase.rating < 1 || useCase.rating > 5)) {
          return res
            .status(400)
            .json({ message: `useCases[${i}].rating must be between 1 and 5` });
        }
      }
    }

    // Validate features if provided
    if (payload.features && Array.isArray(payload.features)) {
      for (let i = 0; i < payload.features.length; i++) {
        const feature = payload.features[i];
        if (!feature.title || !feature.title.trim()) {
          return res
            .status(400)
            .json({ message: `features[${i}].title is required` });
        }
      }
    }

    // Validate pricing if provided
    if (payload.pricing && Array.isArray(payload.pricing)) {
      for (let i = 0; i < payload.pricing.length; i++) {
        const pricing = payload.pricing[i];
        if (!pricing.plan || !pricing.plan.trim()) {
          return res
            .status(400)
            .json({ message: `pricing[${i}].plan is required` });
        }
        if (!pricing.amount || !pricing.amount.trim()) {
          return res
            .status(400)
            .json({ message: `pricing[${i}].amount is required` });
        }
      }
    }

    // Validate alternatives if provided
    if (payload.alternatives && Array.isArray(payload.alternatives)) {
      for (let i = 0; i < payload.alternatives.length; i++) {
        const alternative = payload.alternatives[i];
        if (!alternative.name || !alternative.name.trim()) {
          return res
            .status(400)
            .json({ message: `alternatives[${i}].name is required` });
        }
        if (alternative.rating !== undefined && (alternative.rating < 1 || alternative.rating > 5)) {
          return res
            .status(400)
            .json({ message: `alternatives[${i}].rating must be between 1 and 5` });
        }
      }
    }

    const review = await Review.create(payload);
    res.status(201).json(review);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating review:", error);
    res
      .status(400)
      .json({ message: "Error creating review", error: errorMessage });
  }
};

// UPDATE review
export const updateReview = async (
  req: Request<{ id: string }, IReview | ErrorResponse, ReviewUpdateBody>,
  res: Response<IReview | ErrorResponse>
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      res.status(400).json({ message: "Invalid review id" });
      return;
    }

    const updatedData: ReviewUpdateBody = req.body;

    // Validate productName if being updated
    if (updatedData.productName !== undefined) {
      if (!updatedData.productName || !updatedData.productName.trim()) {
        return res.status(400).json({
          message: "productName cannot be empty",
        });
      }
    }

    // Validate rating if provided
    if (updatedData.rating !== undefined) {
      if (typeof updatedData.rating !== "number" || updatedData.rating < 1 || updatedData.rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be a number between 1 and 5" });
      }
    }

    // Validate aggregateRating if provided
    if (updatedData.aggregateRating !== undefined) {
      if (typeof updatedData.aggregateRating !== "number" || updatedData.aggregateRating < 1 || updatedData.aggregateRating > 5) {
      return res
        .status(400)
          .json({ message: "aggregateRating must be a number between 1 and 5" });
      }
    }

    // Validate nested productReviews ratings if provided
    if (
      updatedData.productReviews &&
      Array.isArray(updatedData.productReviews)
    ) {
      for (let i = 0; i < updatedData.productReviews.length; i++) {
        const review = updatedData.productReviews[i];
        if (review.userName !== undefined && (!review.userName || !review.userName.trim())) {
          return res
            .status(400)
            .json({ message: `productReviews[${i}].userName cannot be empty` });
        }
        if (review.rating !== undefined && (review.rating < 1 || review.rating > 5)) {
          return res
            .status(400)
            .json({ message: `productReviews[${i}].rating must be between 1 and 5` });
        }
      }
    }

    // Validate ratingCategories if provided
    if (updatedData.ratingCategories && Array.isArray(updatedData.ratingCategories)) {
      for (let i = 0; i < updatedData.ratingCategories.length; i++) {
        const category = updatedData.ratingCategories[i];
        if (category.category !== undefined && (!category.category || !category.category.trim())) {
          return res
            .status(400)
            .json({ message: `ratingCategories[${i}].category cannot be empty` });
        }
        if (category.value !== undefined && category.value < 0) {
          return res
            .status(400)
            .json({ message: `ratingCategories[${i}].value must be a non-negative number` });
        }
        if (category.outOf !== undefined && (category.outOf < 1 || (category.value !== undefined && category.value > category.outOf))) {
          return res
            .status(400)
            .json({ message: `ratingCategories[${i}].outOf must be at least 1, and value cannot exceed outOf value` });
        }
      }
    }

    // Validate useCases ratings if provided
    if (updatedData.useCases && Array.isArray(updatedData.useCases)) {
      for (let i = 0; i < updatedData.useCases.length; i++) {
        const useCase = updatedData.useCases[i];
        if (useCase.title !== undefined && (!useCase.title || !useCase.title.trim())) {
          return res
            .status(400)
            .json({ message: `useCases[${i}].title cannot be empty` });
        }
        if (useCase.rating !== undefined && (useCase.rating < 1 || useCase.rating > 5)) {
          return res
            .status(400)
            .json({ message: `useCases[${i}].rating must be between 1 and 5` });
        }
      }
    }

    // Validate features if provided
    if (updatedData.features && Array.isArray(updatedData.features)) {
      for (let i = 0; i < updatedData.features.length; i++) {
        const feature = updatedData.features[i];
        if (feature.title !== undefined && (!feature.title || !feature.title.trim())) {
          return res
            .status(400)
            .json({ message: `features[${i}].title cannot be empty` });
        }
      }
    }

    // Validate pricing if provided
    if (updatedData.pricing && Array.isArray(updatedData.pricing)) {
      for (let i = 0; i < updatedData.pricing.length; i++) {
        const pricing = updatedData.pricing[i];
        if (pricing.plan !== undefined && (!pricing.plan || !pricing.plan.trim())) {
          return res
            .status(400)
            .json({ message: `pricing[${i}].plan cannot be empty` });
        }
        if (pricing.amount !== undefined && (!pricing.amount || !pricing.amount.trim())) {
          return res
            .status(400)
            .json({ message: `pricing[${i}].amount cannot be empty` });
        }
      }
    }

    // Validate alternatives if provided
    if (updatedData.alternatives && Array.isArray(updatedData.alternatives)) {
      for (let i = 0; i < updatedData.alternatives.length; i++) {
        const alternative = updatedData.alternatives[i];
        if (alternative.name !== undefined && (!alternative.name || !alternative.name.trim())) {
          return res
            .status(400)
            .json({ message: `alternatives[${i}].name cannot be empty` });
        }
        if (alternative.rating !== undefined && (alternative.rating < 1 || alternative.rating > 5)) {
          return res
            .status(400)
            .json({ message: `alternatives[${i}].rating must be between 1 and 5` });
        }
      }
    }

    if (updatedData.upvotes !== undefined) {
      return res.status(400).json({ 
        message: "Cannot update upvotes directly. Use POST /reviews/:id/upvote endpoint to increment upvotes." 
      });
    }

    const review = await Review.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!review) return res.status(404).json({ message: "Review not found" });

    console.log("Review updated successfully:", review._id);
    res.json(review);
  } catch (error: unknown) {
    console.error("Error updating review:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res
      .status(400)
      .json({ message: "Error updating review", error: errorMessage });
  }
};

// DELETE review
export const deleteReview = async (
  req: Request<{ id: string }, { message: string; deletedReview: IReview } | ErrorResponse>,
  res: Response<{ message: string; deletedReview: IReview } | ErrorResponse>
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully", deletedReview: review });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Error deleting review", error: errorMessage });
  }
};

export const incrementUpvotes = async (
  req: Request<{ id: string }, IReview | ErrorResponse>,
  res: Response<IReview | ErrorResponse>
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid review id" });
    }

    const review = await Review.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true, runValidators: true }
    );

    if (!review) return res.status(404).json({ message: "Review not found" });

    const currentUpvotes = review.upvotes ?? 0;
    if (currentUpvotes < 0) {
      review.upvotes = 0;
      await review.save();
    }

    res.json(review);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Error incrementing upvotes", error: errorMessage });
  }
};

export default {
  getAllReviews,
  getReviewPageSettings,
  updateReviewPageSettings,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  incrementUpvotes,
};
