import { Router } from "express";
import { indexController } from "../controller/index.controller";


const indexRouter = Router()

indexRouter.get("/", indexController)

export default indexRouter