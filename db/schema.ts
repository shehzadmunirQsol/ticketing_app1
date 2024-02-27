import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  varchar,
  date,
  bigint,
  smallint,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

// project modal and zod schema
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

// types
export const insertUserSchema = createInsertSchema(customerSchema);
export const insertProjectSchema = createInsertSchema(projectSchema);

// relations

// customer has many projects
export const usersRelations = relations(customerSchema, ({ many }) => ({
  projects: many(projectSchema),
}));
