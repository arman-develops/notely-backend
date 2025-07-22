import { Router } from "express";
import { createEntry, getAllEntries } from "../controller/entry.controller";
import { verifyToken } from "../middleware/verifyToken";

const entryRouter = Router()

entryRouter.post("/", verifyToken, createEntry)
entryRouter.get("/", getAllEntries)

export default entryRouter