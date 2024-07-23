import {
  serial,
  pgTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

const manipulation = pgTable("manipulation", {
  id: serial("id"),
  name: varchar("name").notNull(),
  desc: text("desc").notNull(),
  image_link: varchar("image_link").notNull(),
  created_time: timestamp("created_time", { mode: "string" })
    .notNull()
    .default("now()"),
});

export default manipulation;
