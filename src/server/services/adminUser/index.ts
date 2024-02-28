import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import {
  adminUserSchema,
  insertAdminUserSchema,
} from "~/db/schema/adminuser.schema";
import { customerSchema, insertUserSchema } from "~/db/schema/user.schema";

class AdminUserService {
  async create(data: z.infer<typeof insertAdminUserSchema>) {
    // const user = await prisma.customer.create({ data });
    console.log({ data });
    const user = await db
      .insert(adminUserSchema)
      .values({
        ...data,
      })
      .returning();
    return user?.length > 0 ? user[0] : null;
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
      .from(adminUserSchema)
      .where(eq(adminUserSchema.email, email));
    console.log({ user }, "api is returning");

    // const user = await prisma.customer.findUnique({ where: { email } });
    return user?.length > 0 ? user[0] : null;
  }
}

export default new AdminUserService();
