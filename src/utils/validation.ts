import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerOneFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export const registerTwoFormSchema = z
  .object({
    //phone number must be +62 or 0
    phone: z
      .string()
      .refine(
        (phone) => /^(\+62|0)\d{9,12}$/.test(phone),
        "Invalid phone number"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      //password must be have at least 1 uppercase letter
      .refine(
        (password) => /[A-Z]/.test(password),
        "Password must contain uppercase letter"
      )
      //password must be have special character
      .refine(
        (password) => /[^A-Za-z0-9]/.test(password),
        "Password must contain special character"
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
