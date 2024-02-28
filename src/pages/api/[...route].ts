import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { loginCustomerSchema } from "~/schema/auth";
import routes from "~/server/routes";
export const config = {
  runtime: "edge",
};
const app = new Hono().basePath("/api");

// auth
// LOGIN
for (const route of routes) {
  app.route(route.path, route.router);
}

export default handle(app);
