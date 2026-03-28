import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);

export function jwtSign(userId: string) {
  const data = {
    userId,
    time: Date(),
  };

  const token = jwt.sign(data, JWT_SECRET);
  return token;
}

export function validateJwt(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
  }
}
