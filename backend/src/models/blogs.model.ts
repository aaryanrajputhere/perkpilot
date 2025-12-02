import mongoose, { Schema, Document, Types } from "mongoose";
import { ITool } from "./comparision.model.js";

// ============ Type Definitions ============

export interface IModule {
  title: string;
  benefits: string[];
}

export interface IToolBlogCard {
  blogTitle: string;
  blogBody: string;
  blogImage?: string;
  dealsMentioned?: ITool[];
}

export interface IMoreBlog {
  blogId?: Types.ObjectId;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  readingTime?: string;
  viewCount?: number;
  date?: string;
}

// Instance methods interface
interface IBlogMethods {
  incrementViews(): Promise<IBlog>;
}

// Static methods interface
interface IBlogModel extends mongoose.Model<IBlog, Record<string, never>, IBlogMethods> {
  findPublished(filter?: Record<string, unknown>): Promise<IBlog[]>;
  findBySlug(slug: string): Promise<IBlog | null>;
  searchByCategory(category: string): Promise<IBlog[]>;
}

// Main Blog interface
export interface IBlog extends Document, IBlogMethods {
  // Hero Section
  blogHeading: string;
  blogBody: string;
  blogHeroImage: string;

  // Tools Mentioned Section
  sectionHeadline: string;
  tipBulbText: string;
  blogToolsMentioned: ITool[];

  // Metadata
  blogAuthor: Types.ObjectId;
  blogCategory: string;
  blogReadingTime: string;

  // Modules
  modules?: IModule[];

  // Tool Blog Cards
  blogToolBlogCards?: IToolBlogCard[];

  // More Blogs Section
    moreBlogsSectionTitle?: string;
    moreBlogs?: IMoreBlog[];

  // Publishing
  blogSlug: string;
  blogIsPublished: boolean;
  blogIsFeatured?: boolean;
  blogViewCount: number;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// ============ Schemas ============

const ModuleSchema = new Schema<IModule>(
  {
    title: {
      type: String,
      required: [true, "Module title is required"],
      trim: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const ToolBlogCardSchema = new Schema<IToolBlogCard>(
  {
    blogTitle: {
      type: String,
      required: [true, "Blog card title is required"],
      trim: true,
    },
    blogBody: {
      type: String,
      required: [true, "Blog card body is required"],
      trim: true,
    },
    blogImage: {
      type: String,
      validate: {
        validator: function (v: string | undefined) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Invalid blog image URL",
      },
    },
    dealsMentioned: {
      type: [
        {
          toolName: { type: String, required: true },
          toolLogo: { type: String, required: true },
          toolCategory: { type: String, required: true },
          isVerified: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
  },
  { _id: false }
);

const MoreBlogSchema = new Schema<IMoreBlog>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      validate: {
        validator: function (v: string | undefined) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Invalid image URL",
      },
    },
    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readingTime: {
      type: String,
      trim: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

// Reuse Tool schema from comparision model
const ToolSchema = new Schema<ITool>(
  {
    toolName: {
      type: String,
      required: [true, "Tool name is required"],
      trim: true,
    },
    toolLogo: {
      type: String,
      required: [true, "Tool logo is required"],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid tool logo URL",
      },
    },
    toolCategory: {
      type: String,
      required: [true, "Tool category is required"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// Main Blog Schema
const BlogSchema = new Schema<IBlog, IBlogModel, IBlogMethods>(
  {
    // Hero Section
    blogHeading: {
      type: String,
      required: [true, "Blog heading is required"],
      trim: true,
      maxlength: [200, "Blog heading cannot exceed 200 characters"],
    },
    blogBody: {
      type: String,
      required: [true, "Blog body is required"],
      trim: true,
    },
    blogHeroImage: {
      type: String,
      required: [true, "Blog hero image is required"],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid blog hero image URL",
      },
    },

    // Tools Mentioned Section
    sectionHeadline: {
      type: String,
      required: [true, "Section headline is required"],
      trim: true,
    },
    tipBulbText: {
      type: String,
      required: [true, "Tip bulb text is required"],
      trim: true,
    },
    blogToolsMentioned: {
      type: [ToolSchema],
      default: [],
    },

    // Metadata
    blogAuthor: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Blog author is required"],
    },
    blogCategory: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
      index: true,
    },
    blogReadingTime: {
      type: String,
      required: [true, "Blog reading time is required"],
      trim: true,
    },

    // Modules
    modules: {
      type: [ModuleSchema],
      default: [],
    },

    // Tool Blog Cards
    blogToolBlogCards: {
      type: [ToolBlogCardSchema],
      default: [],
    },

    // More Blogs Section
    moreBlogsSectionTitle: {
      type: String,
      trim: true,
    },
    moreBlogs: {
      type: [MoreBlogSchema],
      default: [],
    },

    // Publishing
    blogSlug: {
      type: String,
      required: [true, "Blog slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[a-z0-9-]+$/.test(v);
        },
        message: "Slug must contain only lowercase letters, numbers, and hyphens",
      },
    },
    blogIsPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    blogIsFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    blogViewCount: {
      type: Number,
      default: 0,
      min: [0, "View count cannot be negative"],
    },
  },
  {
    timestamps: true,
    collection: "blogs",
  }
);

// ============ Indexes ============

BlogSchema.index({ blogSlug: 1 });
BlogSchema.index({ blogCategory: 1, blogIsPublished: 1 });
BlogSchema.index({ blogIsPublished: 1, createdAt: -1 });
BlogSchema.index({ blogIsFeatured: 1, createdAt: -1 });

// ============ Instance Methods ============

BlogSchema.methods.incrementViews = async function () {
  this.blogViewCount += 1;
  return await this.save();
};

// ============ Static Methods ============

BlogSchema.statics.findPublished = function (filter: Record<string, unknown> = {}) {
  return this.find({ ...filter, blogIsPublished: true })
    .sort({ createdAt: -1 })
    .exec();
};

BlogSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ blogSlug: slug.toLowerCase() }).exec();
};

BlogSchema.statics.searchByCategory = function (category: string) {
  return this.find({
    blogCategory: new RegExp(category, "i"),
    blogIsPublished: true,
  })
    .sort({ blogViewCount: -1 })
    .exec();
};



export default mongoose.model<IBlog>("Blog", BlogSchema);
