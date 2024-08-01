import {
  serial,
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import test from "./test";
import { relations } from "drizzle-orm";

const testItem = pgTable("testItem", {
  id: serial("id").primaryKey(),
  test_id: integer("test_id")
    .notNull()
    .references(() => test.id),
  question: text("question").notNull(),
  choices: text("choices").notNull(),
  correct_answer: text("correct_answer"),
  user_answer: text("user_answer"),
  ai_explanation: text("ai_explanation"),
  grade_justification: text("grade_justification"),
  grade: integer("grade"),
  created_time: timestamp("created_time", { mode: "string" })
    .notNull()
    .default("now()"),
});

export const testItemRelations = relations(testItem, ({ one }) => ({
  test: one(test, {
    fields: [testItem.test_id],
    references: [test.id],
  }),
}));

export default testItem;
