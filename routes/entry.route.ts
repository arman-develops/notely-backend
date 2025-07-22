import { Router } from "express";
import { createEntry } from "../controller/entry.controller";
import { verifyToken } from "../middleware/verifyToken";

const entryRouter = Router()

entryRouter.post("/", verifyToken, createEntry)

export default entryRouter