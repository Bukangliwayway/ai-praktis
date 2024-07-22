import {
  serial,
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const Manipulations = pgTable("manipulations", {
  id: serial("id"),
  name: varchar("name").notNull(),
  desc: text("desc").notNull(),
  imagelink: varchar("imagelink").notNull(),
  createdTime: timestamp("createdTime").default("now()"),
  createdBy: varchar("createdBy").notNull(),
});

export const Test = pgTable("test", {
  id: serial("id"),
  testID: varchar("testID").notNull(),
  email: varchar("email").notNull(),
  scenarioPrompt: text("scenarioPrompt").notNull(),
  totalScore: integer("totalScore").notNull(),
  createdTime: timestamp("createdTime").default("now()"),
  createdBy: varchar("createdBy").notNull(),
});

export const TestItem = pgTable("testItem", {
  id: serial("id"),
  testID: integer("testID")
    .notNull()
    .references(() => Test.testID),
  question: text("question").notNull(),
  choices: text("choices").notNull(),
  userAnswer: text("userAnswer").notNull(),
  aiExplanation: text("aiExplanation").notNull(),
  gradeJustification: text("gradeJustification").notNull(),
  grade: integer("grade").notNull(),
  createdTime: timestamp("createdTime").default("now()"),
  createdBy: varchar("createdBy").notNull(),
});
