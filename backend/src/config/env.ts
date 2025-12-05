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
  FRONTEND_URL: z
    .string()
    .transform((val) => {
      if (!val) return val;
      return val.replace(/^["']|["']$/g, '').trim();
    })
    .refine(
      (val) => {
        if (!val) return true;
        const urls = val.split(',').map((url) => url.trim().replace(/^["']|["']$/g, '')).filter((url) => url.length > 0);
        if (urls.length === 0) return false;
        try {
          return urls.every((url) => {
            new URL(url);
            return true;
          });
        } catch {
          return false;
        }
      },
      {
        message: "FRONTEND_URL must be a valid URL or comma-separated URLs (e.g., 'https://example.com' or 'https://app1.com,https://app2.com')",
      }
    )
    .optional(),
  ADMIN_URL: z
    .string()
    .transform((val) => {
      if (!val) return val;
      return val.replace(/^["']|["']$/g, '').trim();
    })
    .refine(
      (val) => {
        if (!val) return true;
        const urls = val.split(',').map((url) => url.trim().replace(/^["']|["']$/g, '')).filter((url) => url.length > 0);
        if (urls.length === 0) return false;
        try {
          return urls.every((url) => {
            new URL(url);
            return true;
          });
        } catch {
          return false;
        }
      },
      {
        message: "ADMIN_URL must be a valid URL or comma-separated URLs (e.g., 'https://admin.example.com' or 'https://admin1.com,https://admin2.com')",
      }
    )
    .optional(),
});

const env: z.infer<typeof envSchema> = (() => {
try {
    return envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      const pathKey = issue.path[0] as string;
      if (pathKey) {
        const actualValue = process.env[pathKey];
        console.error(`    Received value: ${actualValue ? `"${actualValue}"` : '(undefined)'}`);
        if (pathKey === 'ALLOWED_ADMIN_EMAIL') {
          console.error(`    Expected format: "admin@example.com" or "admin1@example.com,admin2@example.com"`);
        } else if (pathKey === 'FRONTEND_URL' || pathKey === 'ADMIN_URL') {
          console.error(`    Expected format: "https://example.com" or "https://app1.com,https://app2.com"`);
        }
      }
    });
  }
  throw error;
}
})();

export { env };
