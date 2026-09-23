import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name should be more than 3 characters")
      .max(15, "Name should be less than 15 characters"),

    username: z
      .string()
      .nonempty("Username is required")
      .min(3, "Username should be more than 3 characters")
      .max(15, "Username should be less than 15 characters"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Enter a valid email"),

    password: z
      .string()
      .nonempty("Password is required"),

    rePassword: z
      .string()
      .nonempty("Confirm password is required"),

    dateOfBirth: z
      .string()
      .nonempty("Date of birth is required")
      .refine(function(dataValue){
         const currentYear =  new Date().getFullYear();
         const selectYear = new Date(dataValue).getFullYear();
         const age = currentYear - selectYear
         return age >=18


      },'Age not less than 18 years'),

    gender: z
      .enum(["", "female", "male"])
      .refine((value) => value !== "", {
        message: "Gender is required",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormData = z.input<typeof registerSchema>;
