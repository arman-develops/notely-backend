import { Router } from "express";
import { createEntry, getAllEntries, getPinnedEntries, getTrashedEntries } from "../controller/entries.controller";
import { verifyToken } from "../middleware/verifyToken";

const entriesRouter = Router()

entriesRouter.post("/", verifyToken, createEntry)
entriesRouter.get("/", verifyToken ,getAllEntries)
entriesRouter.get("/trash", verifyToken, getTrashedEntries)
entriesRouter.get("/pinned", verifyToken, getPinnedEntries)

export default entriesRouter