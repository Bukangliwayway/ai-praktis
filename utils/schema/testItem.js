import {
serial,
pgTable,
text,
varchar,
integer,
timestamp,
} from "drizzle-orm/pg-core";
import test from "./test";

const testItem = pgTable("testItem", {
id: serial("id"),
test_id: integer("test_id")
  .notNull()
  .references(() => test.id),
question: text("question").notNull(),
choices: text("choices").notNull(),
user_answer: text("user_answer").notNull(),
ai_explanation: text("ai_explanation").notNull(),
grade_justification: text("grade_justification").notNull(),
grade: integer("grade").notNull(),
created_time: timestamp("created_time", { mode: "string" })
  .notNull()
  .default("now()"),
});

export default testItem;
