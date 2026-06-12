import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import { userRoutes } from "./routes/user-route";

const app = new Elysia()
  .use(userRoutes)
  .get("/", async () => {
    try {
      const allUsers = await db.select().from(users);
      return {
        message: "Hello World! ElysiaJS + Drizzle + MySQL are working.",
        users: allUsers,
      };
    } catch (error: any) {
      return {
        message: "Error connecting to the database.",
        error: error.message,
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
