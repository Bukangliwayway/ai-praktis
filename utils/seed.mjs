import config from "../drizzle.config.js";
import pkg from "./index.js";
import dotenv from "dotenv";
import { getTableName, sql } from "drizzle-orm";
import * as schema from "./schema";
import * as seeds from "./seeds";

dotenv.config({ path: ".env.local" });

const { db, connection } = pkg;

if (!process.env.NEXT_DRIZZLE_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

// async function resetTable(db, table) {
//   const tableName = getTableName(table);
//   return db.execute(
//     sql.raw(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`)
//   );
// }

// for (const table of [schema.manipulation, schema.test, schema.testItem]) {
//   await resetTable(db, table);
// }

//iganto mo munaa taenang bug kase yann
db.execute(
  sql.raw(`TRUNCATE TABLE manipulation RESTART IDENTITY CASCADE`),
  sql.raw(`TRUNCATE TABLE test RESTART IDENTITY CASCADE`),
  sql.raw(`TRUNCATE TABLE testItem RESTART IDENTITY CASCADE`)
);

await seeds.manipulation(db);
await seeds.test(db);
await seeds.testItem(db);

await connection?.end;
