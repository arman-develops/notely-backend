import { Router } from "express";
import { createEntry, getAllEntries, getTrashedEntries } from "../controller/entries.controller";
import { verifyToken } from "../middleware/verifyToken";

const entriesRouter = Router()

entriesRouter.post("/", verifyToken, createEntry)
entriesRouter.get("/", getAllEntries)
entriesRouter.get("/trash", verifyToken, getTrashedEntries)

export default entriesRouter