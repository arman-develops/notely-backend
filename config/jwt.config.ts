import { Secret } from "jsonwebtoken";

export const jwt_secret: Secret = process.env.JWT_SECRET as Secret;
