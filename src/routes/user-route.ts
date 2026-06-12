import { Elysia } from "elysia";
import { registerUser } from "../services/user-service";

export const userRoutes = new Elysia({ prefix: "/api/users" })
  .post("/", async ({ body, set }) => {
    try {
      const response = await registerUser(body);
      set.status = 201;
      return response;
    } catch (e: any) {
      if (e.message === "Email sudah terdaftar") {
        set.status = 400;
        return { error: e.message };
      }
      
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  });
