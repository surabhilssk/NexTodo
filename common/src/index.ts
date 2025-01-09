import z from "zod";

//signinschema
export const signupSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8)
});

export type SignupType = z.infer<typeof signupSchema>;

//signupschema
export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export type SigninType = z.infer<typeof signinSchema>;

//updateuserschema
export const updateUserSchema = z.object({
    name: z.string().optional(),
    password: z.string().min(8).optional(),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;

//todocreateschema
export const todoCreateSchema = z.object({
    title: z.string(),
    description: z.string().optional()
});

export type TodoCreateType = z.infer<typeof todoCreateSchema>;

//todoupdateschema
export const updateTodoSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});

export type UpdateTodoType = z.infer<typeof updateTodoSchema>;



