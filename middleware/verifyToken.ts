import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { sendErrorResponse } from "../helpers/error.helper";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/jwt.config";

export interface Auth extends Request {
  user?:
    | {
        userID?: string;
      }
    | JwtPayload;
}

export async function verifyToken(
  req: Auth,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1] as string;

  if (!token) {
    sendErrorResponse(
      res,
      { authError: "could not verify token" },
      "An error occurred while authenticating your session, please login",
    );
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    sendErrorResponse(res, { error }, "Oops, something went wrong");
  }
}
