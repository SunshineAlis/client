import { object, string, number, date, InferType } from "yup";

const loginSchema = object({
  password: string().length(8).required(),
  email: string().email().required(),
});
