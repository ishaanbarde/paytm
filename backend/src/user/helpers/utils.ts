import bcrypt from "bcrypt";
import { UserModel } from "../user.model.js";

// User Model
const userModel = UserModel;

// Check user in database
export async function checkUser(email: string) {
  const user = await userModel.findOne({ email: email });

  if (user) return user;
  return null;
}

// Salt config
const saltRounds = 10;

// Convert password to hash
export async function hashPassword(input: string) {
  const hashedPassword = await bcrypt.hash(input, saltRounds);
  return hashedPassword;
}

// Compare password using hashed password
export async function comparedPassword(
  password: string,
  storedPassword: string,
) {
  const verifiedPassword = await bcrypt.compare(password, storedPassword);
  return verifiedPassword;
}
