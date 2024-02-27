import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const customerSchema = pgTable("Customer", {
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
});
export const insertUserSchema = createInsertSchema(customerSchema);

//  email        String            @unique
//   username     String?           @default("")
//   password     String
//   is_approved  Boolean           @default(false)
//   otp          String            @default("")
//   first_name   String?
//   profile_pic  String?
//   last_name    String?
//   phone_number String?
//   country      String?
//   gender       GenderEnums       @default(male)
//   role         CustomerTypeEnums @default(seller)
//   dob          DateTime?
//   is_registerd Boolean           @default(false)
//   is_deleted   Boolean           @default(false)
//   is_blocked   Boolean           @default(false)
//   is_verified  Boolean           @default(false)
//   is_disabled  Boolean           @default(false)
//   created_at   DateTime          @default(now())
//   updated_at   DateTime          @default(now())
