import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config/env.js";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

/**
 * Generate JWT token
 */
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

/**
 * POST /api/auth/create-user
 * Create a new user (Admin only)
 * Only existing admins can create new users
 */
export const createUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.status(403).json({ error: "Forbidden: Admin access required" });
      return;
    }

    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    // Validate ALLOWED_ADMIN_EMAIL before using split()
    const allowedEmailsStr = env.ALLOWED_ADMIN_EMAIL;
    if (!allowedEmailsStr || typeof allowedEmailsStr !== 'string' || allowedEmailsStr.trim().length === 0) {
      console.error("ERROR: ALLOWED_ADMIN_EMAIL is missing or invalid. User creation aborted.");
      res.status(500).json({ error: "Server configuration error: Admin email list not configured" });
      return;
    }

    const allowedEmails = allowedEmailsStr
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0);

    const normalizedEmail = email.trim().toLowerCase();
    const userIsAdmin = isAdmin === true 
      ? true 
      : allowedEmails.includes(normalizedEmail);


    const user = await User.create({
      email: normalizedEmail,
      password,
      isAdmin: userIsAdmin,
    });


    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    if (error instanceof Error) {
      if (error.name === "ValidationError") {
        res.status(400).json({ error: error.message });
        return;
      }
    }
    res.status(500).json({ error: "Internal server error during user creation" });
  }
};

/**
 * POST /api/auth/login
 * Login user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken(String(user._id));

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error during login" });
  }
};

/**
 * GET /api/auth/check
 * Check if the current user is authenticated and return their admin status
 * Returns the user's email and isAdmin flag
 */
export const checkAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized: No authenticated user" });
      return;
    }

    res.json({
      authorized: true,
      email: user.email,
      isAdmin: user.isAdmin,
      message: "User is authenticated",
    });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({ error: "Internal server error during auth check" });
  }
};

