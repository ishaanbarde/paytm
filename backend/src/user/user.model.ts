import { model, Schema } from "mongoose";
import z from "zod";

// User Schema
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// User validation
export const createUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// Login validation
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UserModel = model("User", UserSchema);
