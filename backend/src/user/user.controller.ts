import { Router, type Request, type Response } from "express";
import { createUserSchema, userLoginSchema } from "./user.model.js";
import { validate } from "../common/middlewares.js";
import * as userService from "./user.service.js";

const userRoutes = Router();

userRoutes.post("/register", validate(createUserSchema), createUser);
userRoutes.post("/login", validate(userLoginSchema), userLogin);

async function createUser(req: Request, res: Response) {
  try {
    const result = await userService.signUp(req.body);

    return res.status(result.statusCode || result.status || 201).json(result);
  } catch (error) {
    console.log(`Error in createUser :: ${error}`);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

async function userLogin(req: Request, res: Response) {
  try {
    const result = await userService.signIn(req.body);

    return res.json(result);
  } catch (error) {
    console.log(`Error in userLogin :: ${error}`);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export default userRoutes;
