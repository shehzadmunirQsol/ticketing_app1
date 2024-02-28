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
import { projectAddressSchema } from "./address.schema";
import { customerSchema } from "./user.schema";

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
  client_id: integer("client_id")
    .references(() => customerSchema.id, { onDelete: "cascade" })
    .notNull(),
  user_id: integer("user_id")
    .references(() => customerSchema.id, { onDelete: "cascade" })
    .notNull(),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
});
export const insertProjectSchema = createInsertSchema(projectSchema);

// relations

// project address relation
export const projectRelations = relations(projectSchema, ({ many, one }) => ({
  project_address: many(projectAddressSchema),
  users: many(customerSchema),
  client: one(customerSchema, {
    fields: [projectSchema.client_id],
    references: [customerSchema.id],
  }),
}));
