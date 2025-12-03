import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config/env.js";

/**
 * Extend Express Request type to include user
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

/**
 * Middleware to require JWT authentication
 * Verifies the JWT token from Authorization header
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.substring(7);

    // Verify token
    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    } catch {
      res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
      return;
    }

    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).json({ error: "Unauthorized: User not found" });
      return;
    }

    // Attach user to request
    (req as AuthenticatedRequest).user = {
      id: String(user._id),
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
};

/**
 * Middleware to check if the authenticated user has admin access
 * Use this after requireAuth middleware.
 *
 * Usage:
 * router.post('/', requireAuth, checkAdminAccess, createDeal);
 */
export const checkAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized: No authenticated user" });
      return;
    }


    if (!user.isAdmin) {
      res.status(403).json({
        error: "Forbidden: Admin access required",
      });
      return;
    }
    next();
  } catch (error) {
    console.error("Admin access check error:", error);
    res.status(500).json({ error: "Internal server error during authorization" });
  }
};
