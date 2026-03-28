import type { NextFunction, Request, Response } from "express";
import { validateJwt } from "../common/jwt.js";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Forbidden Resource",
    });
  }

  const token = authHeader.split(" ")[1];
  const decoded = validateJwt(token);
  (req as any).userId = (decoded as any).userId;
  next();
}
