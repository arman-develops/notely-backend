import { Router } from "express";
import { updateUserInfo } from "../controller/user.controller";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();

userRouter.patch("/", verifyToken, updateUserInfo);

export default userRouter;
