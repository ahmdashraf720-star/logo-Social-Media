import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Current password is required"),

    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(
        8,
        "New password must be at least 8 characters"
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmNewPassword: z
      .string()
      .nonempty(
        "Please confirm your new password"
      ),
  })
  .refine(
    (data) =>
      data.newPassword ===
      data.confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    }
  );

export type ChangePasswordFormData = z.infer<
  typeof changePasswordSchema
>;