import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const connection = neon(process.env.NEXT_DRIZZLE_DATABASE_URL, {
  max:
    process.env.NEXT_DRIZZLE_MIGRATING || process.env.NEXT_DRIZZLE_SEEDING
      ? 1
      : undefined,
  onnotice: process.env.NEXT_DRIZZLE_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, { schema, logger: true });

export default db;
