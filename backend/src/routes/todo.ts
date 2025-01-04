import { Hono } from "hono";

export const todoRouter = new Hono();

todoRouter.get("/");
todoRouter.get("/:id");
todoRouter.post("/");
todoRouter.put("/:id");
todoRouter.delete("/:id");