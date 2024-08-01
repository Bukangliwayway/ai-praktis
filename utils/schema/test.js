import { relations } from "drizzle-orm";
import {
  serial,
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import testItem from "./testItem";

const test = pgTable(
  "test",
  {
    id: serial("id").primaryKey(),
    test_uuid: varchar("test_uuid", { length: 50 }).notNull(),
    email: varchar("email").notNull(),
    scenario_prompt: text("scenario_prompt").notNull(),
    total_score: integer("total_score").notNull().default(0),
    status: varchar("status", { length: 50 }).notNull().default("unfinished"),
    created_time: timestamp("created_time", { mode: "string" })
      .notNull()
      .default("now()"),
  },
  (table) => ({
    email_index: index().on(table.email),
  })
);

  export const testRelations = relations(test, ({ many }) => ({
    testItems: many(testItem),
  }));

export default test;