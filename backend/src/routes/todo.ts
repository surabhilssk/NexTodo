import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { todoCreateSchema,updateTodoSchema } from "@surabhilssk/project-mache";

export const todoRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

//MIDDLEWARE
todoRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if(user){
        c.set("userId", String(user.id));
        await next();
    }else{
        c.status(403);
        return c.json({
            error: "Unauthorized"
        });
    }
});

//CREATE TODO ROUTE
todoRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = todoCreateSchema.safeParse(body);

    if(!success){
        return c.json({
            error: "Invalid Input"
        })
    }

    const todoResponse = await prisma.toDo.create({
        data: {
            title: body.title,
            description: body.description || undefined,
            userId: c.get("userId")
        }
    });

    return c.json({
        todoResponse
    })
});

//BULK ROUTE
todoRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const todos = await prisma.toDo.findMany({
        where: {
            userId: c.get("userId")
        }
    });
    return c.json({
        todos
    })
});

//SPECIFIC TODO ROUTE
todoRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const todo = await prisma.toDo.findFirst({
        where: {
            id: String(id),
        }
    });

    return c.json({
        todo
    })

});

//UPDATE TODO ROUTE
todoRouter.put("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const body = await c.req.json();

    const { success } = updateTodoSchema.safeParse(body);

    if(!success){
        return c.json({
            error: "Invalid Input"
        })
    }

    const todoUpdate = await prisma.toDo.update({
        where: {
            id: String(id),
        },
        data: {
            title: body.title || undefined,
            description: body.description || undefined,
        }
    });

    return c.json({
        todoUpdate
    });

});

//DELETE TODO ROUTE
todoRouter.delete("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const todoDelete = await prisma.toDo.delete({
        where: {
            id: String(id),
        }
    });

    return c.json({
        message: "Deleted Successfully",
        todoDelete
    });

});