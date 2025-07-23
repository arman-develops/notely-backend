import { Router } from "express";
import { updateUserInfo } from "../controller/user.controller";

const userRouter = Router()

userRouter.patch("/", updateUserInfo)

export default userRouter