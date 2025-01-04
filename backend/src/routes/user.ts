import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify, jwt } from "hono/jwt"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

//MIDDLEWARE
userRouter.use("/update", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if(user){
        c.set("userId", String(user.id));
        await next();
    }else{
        c.status(403);
        c.json({
            error: "Unauthorized"
        });
    }
});

//SIGNUP ROUTE
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try{
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        });
        const token = await sign({id: user.id}, c.env.JWT_SECRET);
        return c.json({
            jwt: token
        })
    }catch(e: any){
        console.log(e);
        c.status(403);
        return c.json({
            error: "Unable to signup / Email already used",
            main : e.message
        });
    }
});

//SIGNIN ROUTE
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try{
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        });
        const jwt = await sign({ id: user?.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: jwt
        })
    }catch(e){
        c.status(403);
        c.json({
            error: "User not found!"
        })
    }
});

//UPDATE USER
userRouter.put("/update", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get("userId");
    try{
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: body.password || undefined,
                name: body.name || undefined
            }
        });
        return c.json({
            user
        })
    }catch(e){
        c.status(403);
        c.json({
            error: "Unable to update user"
        })
    }
})