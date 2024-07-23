import {
  serial,
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

const test = pgTable(
  "test",
  {
    id: serial("id").primaryKey(),  // Change this line
    email: varchar("email").notNull(),
    scenario_prompt: text("scenario_prompt").notNull(),
    total_score: integer("total_score").notNull(),
    created_time: timestamp("created_time", { mode: "string" })
      .notNull()
      .default("now()"),
  },
  (table) => ({
    email_index: index().on(table.email),
  })
);

export default test;
