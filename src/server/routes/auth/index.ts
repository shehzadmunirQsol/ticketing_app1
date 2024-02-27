import { Hono } from "hono";
import { ZodError } from "zod";
import userService from "../../services/user";
import userSchema from "./schema";
import { HTTPException } from "hono/http-exception";
import { signJWT } from "../../../utils/jwt";
import { registerCustomerSchema } from "@/src/schema/project";
import { loginCustomerSchema } from "@/src/schema/auth";
export const config = {
  runtime: "edge",
};
const authRouter = new Hono();

authRouter.post("/login", async (c) => {
  try {
    const payload = await c.req.text();
    if (!payload)
      throw new HTTPException(400, { message: "payload not found" });
    const input = JSON.parse(payload as any);
    const validate = loginCustomerSchema.safeParse(input);
    if (!validate.success)
      throw new HTTPException(400, {
        message:
          validate?.error && validate?.error?.errors[0]?.message
            ? validate?.error?.errors[0]?.message
            : "Bad Request",
      });
    const customer: any = await userService.findByEmail(validate.data?.email);
    console.log({ customer });
    if (!customer) throw new HTTPException(400, { message: "Not found" });
    if (!validate.data?.is_google) {
      // Compare the provided password with the hashed password stored in the database
      if (!validate.data?.password)
        throw new HTTPException(400, { message: "Password is reuired." });
      // const passwordMatch = await bcrypt.compare(
      //   validate.data?.password,
      //   customer.password
      // );

      // if (!passwordMatch) {
      //   throw new HTTPException(400, { message: "Invalid credentials." });
      // }
    }
    const jwt = await signJWT({
      email: customer.email,
      role: customer.role,
      id: customer.id,
    });
    const { password, ...data } = customer;
    return c.json({ customer: data, jwt });
    // const user = await userService.create(payload);

    // return c.json(user, 201);
  } catch (error: any) {
    if (error.code === "P2002") {
      return c.json({ error: "Email already in use" }, 400);
    }
    console.log(error);
    return c.json({ error: error?.message }, 500);
  }
});
authRouter.post("/register", async (c) => {
  console.log("inside register api");

  try {
    const payload = await c.req.text();
    console.log({ payload });
    if (!payload)
      throw new HTTPException(400, { message: "payload not found" });
    const input = JSON.parse(payload as any);
    const validate = registerCustomerSchema.safeParse(input);
    if (!validate.success)
      throw new HTTPException(400, {
        message:
          validate?.error && validate?.error?.errors[0]?.message
            ? validate?.error?.errors[0]?.message
            : "Bad Request",
      });
    const existingUser: any = await userService.findByEmail(
      validate.data?.email
    );

    if (existingUser)
      throw new HTTPException(400, {
        message: "Email already exists. Please use a different email.",
      });
    const result: any = await userService.create({
      ...validate.data,
    });
    const jwt = await signJWT({
      email: result.email,
      role: result.role,
      id: result.id,
    });

    const { password, ...data } = result;
    return c.json({ customer: data, jwt });
    // const user = await userService.create(payload);

    // return c.json(user, 201);
  } catch (error: any) {
    if (error.code === "P2002") {
      return c.json({ error: "Email already in use" }, 400);
    }
    console.log(error);
    return c.json({ error: error?.message }, 500);
  }
});
export default authRouter;
