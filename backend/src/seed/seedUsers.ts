import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import crypto from "crypto";
import connectDB from "../config/db.js";
import User from "../models/user.model.js";
import { env } from "../config/env.js";

/**
 * Seed admin users based on ALLOWED_ADMIN_EMAIL environment variable
 */
async function seedUsers() {
  try {
    await connectDB();
    console.log("MongoDB connected");

    const allowedEmailsStr = env.ALLOWED_ADMIN_EMAIL;
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0);

    if (allowedEmails.length === 0) {
      console.error("No admin emails found in ALLOWED_ADMIN_EMAIL");
      process.exit(1);
    }

    console.log(`\nSeeding ${allowedEmails.length} admin user(s)...\n`);

    let defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    
    if (!defaultPassword) {
      const randomBytes = crypto.randomBytes(16);
      defaultPassword = randomBytes.toString('base64').replace(/[+/=]/g, '').substring(0, 16) + 'A1!';
      console.warn("⚠️  WARNING: DEFAULT_ADMIN_PASSWORD not set. Generated secure password.");
      console.warn("⚠️  IMPORTANT: Save this password securely - it will not be shown again!");
      console.warn(`⚠️  Generated password: ${defaultPassword}`);
      console.warn("⚠️  Set DEFAULT_ADMIN_PASSWORD in .env to use a fixed password.\n");
    }

    for (const email of allowedEmails) {
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          console.log(`✓ User already exists: ${email}`);
          if (!existingUser.isAdmin) {
            existingUser.isAdmin = true;
            await existingUser.save();
            console.log(`  → Updated to admin: ${email}`);
          }
          continue;
        }

        await User.create({
          email,
          password: defaultPassword,
          isAdmin: true,
        });

        console.log(`✓ Created admin user: ${email}`);
        console.log(`  → ⚠️  IMPORTANT: Change password after first login!\n`);
      } catch (error) {
        console.error(`✗ Error creating user ${email}:`, error);
      }
    }

    console.log("\n✓ User seeding completed!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run if executed directly
seedUsers();

export default seedUsers;

