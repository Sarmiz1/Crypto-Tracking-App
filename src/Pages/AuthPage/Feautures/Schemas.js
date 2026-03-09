import { z } from "zod";


// Zod schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(3, 'name cant be less than 3 letters'),
    email: z.string().email(),
    gender: z.string().min(1, 'pick atleast 1 gender'),
    phone: z.string().min(10, 'Phone number cant be less than 10 digits'),
    address: z.string().min(5, 'Address cant be less than 5 letters'),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[0-9]/),
    confirmPassword: z.string(),
    agree: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });