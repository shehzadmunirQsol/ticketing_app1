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

// user modal and zod schema
export const adminUserSchema = pgTable("admin_user", {
  id: serial("id").primaryKey().unique(),
  name: varchar("name").default(""),
  email: varchar("email").unique(),
  password: varchar("password").default(""),
  role_id: integer("role_id"),
  is_deleted: boolean("is_deleted").default(false),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
});

// types
export const insertAdminUserSchema = createInsertSchema(adminUserSchema);
