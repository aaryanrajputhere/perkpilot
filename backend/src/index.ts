import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from './config/db.js';
import dealsRoutes from './routes/deals.routes.js';
import comparisionRouter from './routes/comparision.routes.js';
import reviewsRoutes from './routes/reviews.routes.js';
import authorRoutes from './routes/author.routes.js';
import blogsRoutes from './routes/blogs.routes.js';
import homepageRoutes from './routes/homepage.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

connectDB();

const app = express();

app.use(helmet());


app.use(cors({
  origin: true, 
  credentials: true,
  optionsSuccessStatus: 200,
}));





const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/deals", dealsRoutes);

app.use("/api/comparisons", comparisionRouter);

app.use("/api/reviews", reviewsRoutes);

app.use("/api/authors", authorRoutes);

app.use("/api/blogs", blogsRoutes);

app.use("/api/homepage", homepageRoutes);

app.use("/api/auth", authLimiter, authRoutes);
app.get("/", (_req: Request, res: Response) => {
  console.log("API is running...");
  res.status(200).send("API is running...");
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});
