import {z} from "zod";

export const UsernameSchema = z.string().min(2, "Username must be at least 2 characters long").max(20, "Username must be at most 20 characters long").regex(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers")

export const SignUpSchema = z.object({
    username: UsernameSchema,
    email: z.string().email({message:"Invalid email"}),
    password: z.string().min(6, "Password must be at least 6 characters long")
})  