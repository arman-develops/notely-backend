import { Router } from "express";
import { createUser, login, logout, updatePassword, userOnboarding } from "../controller/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const authRouter = Router()

authRouter.post("/register", createUser)
authRouter.post("/login", login)
authRouter.post("/password", verifyToken,updatePassword)
authRouter.patch("/onboarding", verifyToken, userOnboarding)
authRouter.post("/logout", logout)

export default authRouter