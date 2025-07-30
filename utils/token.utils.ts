import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/jwt.config";
import { Payload } from "../types/payload.types";

export function generateToken(payload: Payload) {
  return jwt.sign(payload, jwt_secret, {
    expiresIn: "1h",
  });
}
