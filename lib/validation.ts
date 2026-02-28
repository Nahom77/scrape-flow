import z from "zod";

// Name
const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 Characters")
  .max(50, "Name shouldn't exceed 25 characters");

// Email
const emailSchema = z.email("Enter a valid Email").trim().toLowerCase();

// Password
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(128, "Password must be at most 128 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .regex(/^\S*$/, "Password must not contain spaces");

// Confirm Password
const confirmPasswordSchema = z.string();

/* -------------------- Sign Up Schema -------------------- */
export const signUpSchema = z
  .object({
    fullName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
