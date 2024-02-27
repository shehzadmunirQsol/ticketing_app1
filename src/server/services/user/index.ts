import { db } from "@/db";
import { customerSchema, insertUserSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

class UserService {
  async create(data: z.infer<typeof insertUserSchema>) {
    // const user = await prisma.customer.create({ data });
    console.log({ data });
    const user = await db.insert(customerSchema).values({
      ...data,
    });
    return user;
  }

  // async findMany() {
  //   const users = await prisma.customer.findMany();
  //   return users;
  // }

  // async findById(id: string) {
  //   const user = await prisma.customer.findUnique({ where: { id } });
  //   // const user = await db.selectDistinct({ where: { email} });

  //   return user;
  // }

  async findByEmail(email: string) {
    const user = await db
      .selectDistinct()
      .from(customerSchema)
      .where(eq(customerSchema.email, email));
    console.log({ user }, "api is returning");

    // const user = await prisma.customer.findUnique({ where: { email } });
    return user?.length > 0 ? user[0] : null;
  }
}

export default new UserService();
