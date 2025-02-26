import { object, string, ref } from "yup";

export const loginSchema = object({
  password: string().length(8).required(),
  email: string().email().required(),
});

export const passwordValidSchema = object({
  password: string()
    .min(8, "Password must be at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .matches(/\d/, "Password must contain at least 1 number.")
    .required("Password is required"),
});

export const emailValidSchema = object({
  email: string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please write email: For example: test@gmail.com"
    )
    .required(),
});
