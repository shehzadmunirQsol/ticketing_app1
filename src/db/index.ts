import postgres from "postgres";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);
// const migrationClient = postgres(process.env.PG_DATABASE_URL, { max: 1 });
// for query purposes
// const client = new Client({
//   connectionString: process.env.PG_DATABASE_URL,
// });
// // const queryClient = postgres(process.env.PG_DATABASE_URL);
// // export const db = drizzle(queryClient);
// await client.connect();
// export const db = drizzle(client);
