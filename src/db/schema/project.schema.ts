import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  varchar,
  date,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const projectSchema = pgTable("project", {
  id: serial("id").primaryKey().unique(),
  name: varchar("name").default(""),
  desc: varchar("desc").default(""),
  thumb: varchar("thumb").default(""),
  material_type: varchar("material_type", { enum: ["dump", "sand"] }).default(
    "dump"
  ),
  price: integer("price").default(0),
  total_rounds: integer("first_name").default(0),
  client_id: integer("client_id"),
  user_id: integer("user_id"),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
});
export const insertProjectSchema = createInsertSchema(projectSchema);
