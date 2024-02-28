//   project_id       String      @db.ObjectId
//   street_address_1 String?
//   street_address_2 String?
//   longitude        String?
//   latitude         String?
//   country          String?
//   state            String?
//   city             String?
//   phone_number     String?
//   phone_code       String?     @default("+971")
//   address_type     AddressType @default(pick)
//   postal_code      String?     @default("")
//   is_default       Boolean     @default(false)
//   is_deleted       Boolean     @default(false)

//   created_at DateTime @default(now())
//   updated_at DateTime @default(now())

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
import { projectSchema } from "./project.schema";

export const projectAddressSchema = pgTable("project_address", {
  id: serial("id").primaryKey().unique(),
  project_id: integer("project_id")
    .references(() => projectSchema.id, { onDelete: "cascade" })
    .notNull(),

  street_address1: varchar("street_address1").default(""),
  street_address2: varchar("street_address2").default(""),
  longitude: varchar("longitude").default(""),
  latitude: varchar("latitude").default(""),
  country: varchar("country").default(""),
  city: varchar("city").default(""),
  state: varchar("state").default(""),
  phone_number: varchar("phone_number").default(""),
  address_type: varchar("address_type", { enum: ["pick", "drop"] }).default(
    "pick"
  ),
  postal_address: varchar("postal_address").default(""),
  is_default: boolean("is_default").default(false),
  is_deleted: boolean("is_deleted").default(false),
  created_at: date("created_at").defaultNow(),
  updated_at: date("updated_at").defaultNow(),
});

export const insertProjectAddressSchema =
  createInsertSchema(projectAddressSchema);

export const projectAddressRelations = relations(
  projectAddressSchema,
  ({ one }) => ({
    projects: one(projectSchema, {
      fields: [projectAddressSchema.project_id],
      references: [projectSchema.id],
    }),
  })
);
