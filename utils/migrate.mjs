import { migrate } from "drizzle-orm/neon-http/migrator";
import pkg from "./index.js";
import config from "../drizzle.config.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { db, connection } = pkg;

if (!process.env.NEXT_DRIZZLE_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations'
  );
}

try {
  console.log("Starting migration...");
  const migratedResult = await migrate(db, {
    migrationsFolder: "./utils/migrations",
    disableTransactions: true,
  });
  console.log("Migration completed:", migratedResult);
} catch (error) {
  console.error("Migration failed:", error);
  process.exit(1);
} finally {
  await connection?.end;

  console.log("Database connection closed.");
}
