import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { projectSchema } from "./project.schema";

// user modal and zod schema
export const customerSchema = pgTable("customer", {
  id: serial("id").primaryKey().unique(),
  email: varchar("email").unique(),
  username: varchar("username").default(""),
  password: varchar("password").default(""),
  otp: varchar("otp").default(""),
  first_name: varchar("first_name").default(""),
  profile_pic: varchar("profile_pic").default(""),
  last_name: varchar("last_name").default(""),
  phone_number: varchar("phone_number").default(""),
  gender: varchar("gender", { enum: ["male", "female"] }).default("male"),
  role: varchar("role", { enum: ["seller", "buyer", "trucker", "client"] }),
  is_registerd: boolean("is_registerd").default(false),
  is_approved: boolean("is_approved").default(false),
  is_deleted: boolean("is_deleted").default(false),
  is_disabled: boolean("is_disabled").default(false),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
});

// types
export const insertUserSchema = createInsertSchema(customerSchema);

// relations of users

export const usersRelations = relations(customerSchema, ({ many }) => ({
  projects: many(projectSchema),
}));
