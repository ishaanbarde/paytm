import { StatusCodes } from "http-status-codes";
import { checkUser, comparedPassword, hashPassword } from "./helpers/utils.js";
import { UserModel } from "./user.model.js";
import { jwtSign } from "../common/jwt.js";

// User Model
const userModel = UserModel;

interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Register
export async function signUp(body: SignUp) {
  const { firstName, lastName, email, password } = body;

  // Check User
  const existingUser = await checkUser(body.email);
  if (existingUser)
    return {
      message: "User already exists. Please login",
      statusCode: StatusCodes.CONFLICT,
    };

  // Hash password
  const hashedPassword = await hashPassword(password);
  // Save
  await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return {
    status: 201,
    message: "User created successfully",
  };
}

interface SignInInterface {
  email: string;
  password: string;
}

// Login
export async function signIn(body: SignInInterface) {
  const { email, password } = body;

  if (!email || !password) {
    return {
      success: false,
      message: "Please enter correct email and password",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const user = await checkUser(email);
  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // Verify password
  const verifyPassword = await comparedPassword(password, user?.password);
  if (!verifyPassword) {
    return {
      success: false,
      status: StatusCodes.UNAUTHORIZED,
      message: "Invalid credentials",
      data: null,
    };
  }

  // Sign jwt token
  const token = jwtSign(user._id.toString());

  return {
    success: true,
    status: StatusCodes.OK,
    message: "Login successful",
    token,
  };
}

export async function userList(filter?: string) {
  const users = await UserModel.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  if (users.length === 0) {
    return {
      success: true,
      status: StatusCodes.NOT_FOUND,
      message: "No user found",
    };
  }

  return {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users fetched successfully",
    users: users.map((u) => ({
      userName: u.userName,
      firstName: u.firstName,
      lastName: u.firstName,
      _id: u._id,
    })),
  };
}
