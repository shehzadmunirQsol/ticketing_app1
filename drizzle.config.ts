import type { Config } from "drizzle-kit";
import "dotenv/config";
if (!process.env.PG_DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}
export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.PG_DATABASE_URL,
    // database: process.env.PG_USER,
    // host: process.env.PG_SERVER,
    // port: 5432,
    // user: process.env.PG_USER,
    // password: process.env.PG_PASSWORD,
  },
} satisfies Config;
