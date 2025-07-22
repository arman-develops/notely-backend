import { Router } from "express";
import { createEntry, getAllEntries, getTrashedEntries } from "../controller/entry.controller";
import { verifyToken } from "../middleware/verifyToken";

const entryRouter = Router()

entryRouter.post("/", verifyToken, createEntry)
entryRouter.get("/", getAllEntries)
entryRouter.get("/trash", verifyToken, getTrashedEntries)

export default entryRouter