import { Router } from "express";
import { createUser } from "../controller/auth.controller";

const authRouter = Router()

authRouter.post("/register", createUser)

export default authRouter