import { Router } from "express";
import { createEntry, getAllEntries, getSingleEntry, getTrashedEntries, restoreTrashedEntry, updateEntry } from "../controller/entry.controller";
import { verifyToken } from "../middleware/verifyToken";

const entryRouter = Router()

entryRouter.post("/", verifyToken, createEntry)
entryRouter.get("/", getAllEntries)
entryRouter.get("/trash", verifyToken, getTrashedEntries)
entryRouter.get("/:id", getSingleEntry)
entryRouter.patch("/:id", updateEntry)
entryRouter.patch("/restore/:id", restoreTrashedEntry)

export default entryRouter