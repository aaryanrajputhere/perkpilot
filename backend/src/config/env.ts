import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().url("Invalid MongoDB connection string"),
  JWT_SECRET: z
    .string()
    .min(10, "JWT_SECRET must be at least 10 characters long"),
  ALLOWED_ADMIN_EMAIL: z
    .string()
    .min(1, "ALLOWED_ADMIN_EMAIL is required")
    .refine(
      (val) => {
        if (!val || typeof val !== 'string') {
          return false;
        }
        const emails = val.split(',').map((e) => e.trim()).filter((e) => e.length > 0);
        if (emails.length === 0) {
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emails.every((email) => emailRegex.test(email));
      },
      {
        message: "ALLOWED_ADMIN_EMAIL must contain valid email address(es) separated by commas (e.g., 'admin@example.com' or 'admin1@example.com,admin2@example.com')",
      }
    ),
});

const env: z.infer<typeof envSchema> = (() => {
try {
    return envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      if (issue.path.includes('ALLOWED_ADMIN_EMAIL')) {
        const actualValue = process.env.ALLOWED_ADMIN_EMAIL;
        console.error(`    Received value: ${actualValue ? `"${actualValue}"` : '(undefined)'}`);
        console.error(`    Expected format: "admin@example.com" or "admin1@example.com,admin2@example.com"`);
      }
    });
  }
  throw error;
}
})();

export { env };
