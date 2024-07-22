import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./utils/schema/index.js",
  out: "./utils/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_DRIZZLE_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
