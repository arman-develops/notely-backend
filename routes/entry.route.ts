import { Router } from "express";
import {
  getSingleEntry,
  updateEntry,
  restoreTrashedEntry,
  deleteEntry,
  pinEntry,
  bookMarkEntry,
} from "../controller/entry.controller";
import { verifyToken } from "../middleware/verifyToken";

const entryRouter = Router();

entryRouter.get("/:id", getSingleEntry);
entryRouter.patch("/:id", verifyToken, updateEntry);
entryRouter.patch("/restore/:id", verifyToken, restoreTrashedEntry);
entryRouter.delete("/:id", verifyToken, deleteEntry);
entryRouter.patch("/pin/:id", verifyToken, pinEntry);
entryRouter.patch("/bookmark/:id", verifyToken, bookMarkEntry);

export default entryRouter;
