import mongoose, { Schema, Model, HydratedDocument, Types } from "mongoose";
import { ComparisonFilter } from '../types/index.js';

// ============ Type Definitions ============

interface ITool {
  toolName: string;
  toolLogo: string;
  toolCategory: string;
  isVerified: boolean;
  primaryCta: string | null;
}

interface IBlogSection {
  sectionNumber: number;
  blogTitle: string;
  blogBody: string;
  additionalNote?: string;
}

interface IFeature {
  featureName: string;
  tool1Available: boolean;
  tool2Available: boolean;
  tool3Available: boolean;
}

interface IFeatureComparison {
  sectionTitle: string;
  featuresHeadline: string;
  tools: string[];
  features: IFeature[];
}

interface IProsConsPair {
  pro: string;
  con: string;
}

interface IProsConsCard {
  cardNumber: number;
  titlePros: string;
  titleCons: string;
  prosConsPairs: IProsConsPair[];
}

interface IComparisonModule {
  moduleNumber: number;
  moduleName: string;
}

// Main document interface
interface IToolComparisonBlog {
  pageType: string;
  heroHeading: string;
  heroBody: string;
  comparisonHeroImage: string;
  sectionHeadline: string;
  tipBulbText: string;
  toolsMentioned: ITool[];
  author: string;
  authorId: Types.ObjectId;
  blogCategory: string;
  readingTime: string;
  toolBlogCards: IBlogSection[];
  featuresComparison: IFeatureComparison;
  prosConsCards: IProsConsCard[];
  blogModules: IComparisonModule[];
  moreComparisonsSectionTitle?: string;
  moreComparisons?: Types.ObjectId[];
  slug: string;
  isPublished: boolean;
  viewCount: number;
}

// Instance methods interface
interface IToolComparisonBlogMethods {
  incrementViews(): Promise<
    HydratedDocument<IToolComparisonBlog, IToolComparisonBlogMethods>
  >;
  getToolByName(toolName: string): ITool | undefined;
  addProsConsPair(cardNumber: number, pro: string, con: string): void;
}

// Static methods interface
interface IToolComparisonBlogModel
  extends Model<IToolComparisonBlog, Record<string, never>, IToolComparisonBlogMethods> {
  findPublished(
    filter?: ComparisonFilter
  ): Promise<
    HydratedDocument<IToolComparisonBlog, IToolComparisonBlogMethods>[]
  >;
  findBySlug(
    slug: string
  ): Promise<HydratedDocument<
    IToolComparisonBlog,
    IToolComparisonBlogMethods
  > | null>;
  searchByCategory(
    category: string
  ): Promise<
    HydratedDocument<IToolComparisonBlog, IToolComparisonBlogMethods>[]
  >;
  searchByToolName(
    toolName: string
  ): Promise<
    HydratedDocument<IToolComparisonBlog, IToolComparisonBlogMethods>[]
  >;
}

// ============ Schemas ============

const ToolSchema = new Schema<ITool>(
  {
    toolName: {
      type: String,
      required: [true, "Tool name is required"],
      trim: true,
      maxlength: [100, "Tool name cannot exceed 100 characters"],
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
      maxlength: [50, "Tool category cannot exceed 50 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    primaryCta: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid primary CTA URL",
      },
    },
  },
  { _id: false }
);

const BlogSectionSchema = new Schema<IBlogSection>(
  {
    sectionNumber: {
      type: Number,
      required: [true, "Section number is required"],
      min: [1, "Section number must be at least 1"],
    },
    blogTitle: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [200, "Blog title cannot exceed 200 characters"],
    },
    blogBody: {
      type: String,
      required: [true, "Blog body is required"],
      trim: true,
    },
    additionalNote: {
      type: String,
      trim: true,
      maxlength: [500, "Additional note cannot exceed 500 characters"],
    },
  },
  { _id: false }
);

const FeatureSchema = new Schema<IFeature>(
  {
    featureName: {
      type: String,
      required: [true, "Feature name is required"],
      trim: true,
      maxlength: [100, "Feature name cannot exceed 100 characters"],
    },
    tool1Available: {
      type: Boolean,
      required: true,
      default: false,
    },
    tool2Available: {
      type: Boolean,
      required: true,
      default: false,
    },
    tool3Available: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false }
);

const FeatureComparisonSchema = new Schema<IFeatureComparison>(
  {
    sectionTitle: {
      type: String,
      required: [true, "Section title is required"],
      trim: true,
      maxlength: [200, "Section title cannot exceed 200 characters"],
    },
    featuresHeadline: {
      type: String,
      required: [true, "Features headline is required"],
      trim: true,
      maxlength: [200, "Features headline cannot exceed 200 characters"],
    },
    tools: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      required: [true, "Tools array is required"],
      validate: [
        {
          validator: function (v: string[]) {
            return v.length >= 2 && v.length <= 3;
          },
          message: "Must have 2 or 3 tools for comparison",
        },
      ],
    },
    features: {
      type: [FeatureSchema],
      default: [],
    },
  },
  { _id: false }
);

const ProsConsPairSchema = new Schema<IProsConsPair>(
  {
    pro: {
      type: String,
      required: [true, "Pro is required"],
      trim: true,
      maxlength: [300, "Pro cannot exceed 300 characters"],
    },
    con: {
      type: String,
      required: [true, "Con is required"],
      trim: true,
      maxlength: [300, "Con cannot exceed 300 characters"],
    },
  },
  { _id: false }
);

const ProsConsCardSchema = new Schema<IProsConsCard>(
  {
    cardNumber: {
      type: Number,
      required: [true, "Card number is required"],
      min: [1, "Card number must be at least 1"],
    },
    titlePros: {
      type: String,
      required: [true, "Pros title is required"],
      trim: true,
      maxlength: [100, "Pros title cannot exceed 100 characters"],
    },
    titleCons: {
      type: String,
      required: [true, "Cons title is required"],
      trim: true,
      maxlength: [100, "Cons title cannot exceed 100 characters"],
    },
    prosConsPairs: {
      type: [ProsConsPairSchema],
      required: [true, "Pros/cons pairs are required"],
      validate: {
        validator: function (v: IProsConsPair[]) {
          return v.length > 0;
        },
        message: "At least one pros/cons pair is required",
      },
    },
  },
  { _id: false }
);

const ComparisonModuleSchema = new Schema<IComparisonModule>(
  {
    moduleNumber: {
      type: Number,
      required: [true, "Module number is required"],
      min: [1, "Module number must be at least 1"],
    },
    moduleName: {
      type: String,
      required: [true, "Module name is required"],
      trim: true,
      maxlength: [200, "Module name cannot exceed 200 characters"],
    },
  },
  { _id: false }
);

// Main Tool Comparison Blog Schema
const ToolComparisonBlogSchema = new Schema<
  IToolComparisonBlog,
  IToolComparisonBlogModel,
  IToolComparisonBlogMethods
>(
  {
    pageType: {
      type: String,
      default: "Tool Comparison Blog",
      immutable: true,
    },
    heroHeading: {
      type: String,
      required: [true, "Hero heading is required"],
      trim: true,
      minlength: [10, "Hero heading must be at least 10 characters"],
      maxlength: [200, "Hero heading cannot exceed 200 characters"],
    },
    heroBody: {
      type: String,
      required: [true, "Hero body is required"],
      trim: true,
      maxlength: [1000, "Hero body cannot exceed 1000 characters"],
    },
    comparisonHeroImage: {
      type: String,
      required: [true, "Hero image is required"],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid hero image URL",
      },
    },
    sectionHeadline: {
      type: String,
      required: [true, "Section headline is required"],
      trim: true,
      maxlength: [200, "Section headline cannot exceed 200 characters"],
    },
    tipBulbText: {
      type: String,
      required: [true, "Tip bulb text is required"],
      trim: true,
      maxlength: [300, "Tip bulb text cannot exceed 300 characters"],
    },
    toolsMentioned: {
      type: [ToolSchema],
      required: [true, "Tools mentioned are required"],
      validate: [
        {
          validator: function (v: ITool[]) {
            return v.length >= 2;
          },
          message: "At least 2 tools must be mentioned",
        },
        {
          validator: function (v: ITool[]) {
            return v.length <= 10;
          },
          message: "Cannot mention more than 10 tools",
        },
      ],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author ID is required"],
      index: true,
    },
    blogCategory: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
      index: true,
    },
    readingTime: {
      type: String,
      required: [true, "Reading time is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\d+\s*(Minute|Minutes|Min)$/i.test(v);
        },
        message:
          'Reading time must be in format like "5 Minute" or "10 Minutes"',
      },
    },
    toolBlogCards: {
      type: [BlogSectionSchema],
      required: [true, "Tool blog cards are required"],
      validate: {
        validator: function (v: IBlogSection[]) {
          return v.length > 0;
        },
        message: "At least one blog section is required",
      },
    },
    featuresComparison: {
      type: FeatureComparisonSchema,
      required: [true, "Features comparison is required"],
    },
    prosConsCards: {
      type: [ProsConsCardSchema],
      required: [true, "Pros/cons cards are required"],
      validate: [
        {
          validator: function (v: IProsConsCard[]) {
            return v.length >= 2;
          },
          message: "At least 2 pros/cons cards are required",
        },
        {
          validator: function (v: IProsConsCard[]) {
            const cardNumbers = v.map((card) => card.cardNumber);
            return new Set(cardNumbers).size === cardNumbers.length;
          },
          message: "Card numbers must be unique",
        },
      ],
    },
    blogModules: {
      type: [ComparisonModuleSchema],
      default: [],
      validate: {
        validator: function (modules: IComparisonModule[]) {
          const moduleNumbers = modules.map((module) => module.moduleNumber);
          return new Set(moduleNumbers).size === moduleNumbers.length;
        },
        message: "Module numbers must be unique",
      },
    },
    moreComparisonsSectionTitle: {
      type: String,
      trim: true,
      default: "",
    },
    moreComparisons: {
      type: [{ type: Schema.Types.ObjectId, ref: "ToolComparisonBlog" }],
      default: [],
      validate: {
        validator: function (comparisons: Types.ObjectId[]) {
          return comparisons.length <= 8;
        },
        message: "Cannot select more than 8 comparisons",
      },
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[a-z0-9-]+$/.test(v);
        },
        message:
          "Slug must contain only lowercase letters, numbers, and hyphens",
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: [0, "View count cannot be negative"],
    },
  },
  {
    timestamps: true,
    collection: "toolComparisonBlogs",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // ============ Instance Methods ============
    methods: {
      async incrementViews() {
        this.viewCount += 1;
        return await this.save();
      },
      getToolByName(toolName: string) {
        return this.toolsMentioned.find(
          (tool) => tool.toolName.toLowerCase() === toolName.toLowerCase()
        );
      },
      addProsConsPair(cardNumber: number, pro: string, con: string) {
        const card = this.prosConsCards.find(
          (c) => c.cardNumber === cardNumber
        );
        if (card) {
          card.prosConsPairs.push({ pro, con });
        }
      },
    },
    // ============ Static Methods ============
    statics: {
      findPublished(filter: ComparisonFilter = {}) {
        return this.find({ ...filter, isPublished: true })
          .sort({ createdAt: -1 })
          .exec();
      },
      findBySlug(slug: string) {
        return this.findOne({ slug: slug.toLowerCase() }).exec();
      },
      searchByCategory(category: string) {
        return this.find({
          blogCategory: new RegExp(category, "i"),
          isPublished: true,
        })
          .sort({ viewCount: -1 })
          .exec();
      },
      searchByToolName(toolName: string) {
        return this.find({
          "toolsMentioned.toolName": new RegExp(toolName, "i"),
          isPublished: true,
        })
          .sort({ createdAt: -1 })
          .exec();
      },
    },
  }
);

// ============ Indexes ============
// Note: slug index is automatically created by unique: true in field definition

ToolComparisonBlogSchema.index({ blogCategory: 1, isPublished: 1 });
ToolComparisonBlogSchema.index({ "toolsMentioned.toolName": 1 });
ToolComparisonBlogSchema.index({ createdAt: -1 });
ToolComparisonBlogSchema.index({ viewCount: -1 });
ToolComparisonBlogSchema.index({
  heroHeading: "text",
  heroBody: "text",
  "toolBlogCards.blogTitle": "text",
  "toolBlogCards.blogBody": "text",
});

// ============ Virtuals ============

ToolComparisonBlogSchema.virtual("toolCount").get(function () {
  return this.toolsMentioned.length;
});

ToolComparisonBlogSchema.virtual("url").get(function () {
  return `/comparison/${this.slug}`;
});

// ============ Middleware ============

// Auto-sort blog sections by section number before save
ToolComparisonBlogSchema.pre("save", function (next) {
  if (this.toolBlogCards && this.toolBlogCards.length > 0) {
    this.toolBlogCards.sort((a, b) => a.sectionNumber - b.sectionNumber);
  }
  next();
});

// Auto-sort pros/cons cards by card number before save
ToolComparisonBlogSchema.pre("save", function (next) {
  if (this.prosConsCards && this.prosConsCards.length > 0) {
    this.prosConsCards.sort((a, b) => a.cardNumber - b.cardNumber);
  }
  next();
});

// ============ Model Export ============

const ToolComparisonBlog = mongoose.model<
  IToolComparisonBlog,
  IToolComparisonBlogModel
>("ToolComparisonBlog", ToolComparisonBlogSchema);

export default ToolComparisonBlog;
export type {
  IToolComparisonBlog,
  IToolComparisonBlogModel,
  IToolComparisonBlogMethods,
  ITool,
  IBlogSection,
  IFeature,
  IFeatureComparison,
  IProsConsPair,
  IProsConsCard,
  IComparisonModule,
};

// Type alias for hydrated documents
export type ToolComparisonBlogDocument = HydratedDocument<
  IToolComparisonBlog,
  IToolComparisonBlogMethods
>;
