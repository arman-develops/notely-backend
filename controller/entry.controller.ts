import { Request, Response } from "express";
import { Auth } from "../middleware/verifyToken";
import { sendErrorResponse } from "../helpers/error.helper";
import { sendSuccessResponse } from "../helpers/success.helper";
import { client } from "../config/prisma.config";

export async function getSingleEntry(req: Auth, res: Response) {
    try {
        const {id} = req.params
        const entry = await client.entry.findFirst({
            where: {
                noteID: id
            }
        })
        sendSuccessResponse(res, {entry}, "Entry fetched successfully")
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

export async function updateEntry(req:Auth, res:Response) {
    try {
        const userID = req.user?.userID
        const {title, synopsis, content} = req.body
        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }
        const {id} = req.params

        const existingEntry = await client.entry.findFirst({
            where: {
                noteID: id
            }
        })

        if(!existingEntry || existingEntry.authorID != userID) {
            return sendErrorResponse(res, {}, "Entry not found", 400)
        }

        const updatedEntry = await client.entry.update({
            data: {
                noteTitle: title,
                synopsis,
                content
            },
            where: {
                noteID: id
            }
        })
        sendSuccessResponse(res, {updatedEntry}, "Entry updated sucessfully")
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

export async function restoreTrashedEntry(req: Auth, res: Response) {
    try {

        const userID = req.user?.userID
        const{id} = req.params

        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }

        const existingEntry = await client.entry.findFirst({
            where: {
                noteID: id
            }
        })

        if(!existingEntry || existingEntry.authorID != userID) {
            return sendErrorResponse(res, {}, "Entry not found", 400)
        }

        const restoredEntry = await client.entry.update({
            data: {
                isDeleted: false
            },
            where: {
                noteID: id
            }
        })
        sendSuccessResponse(res, {restoredEntry}, "Entry restored successfully")
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

export async function deleteEntry(req: Auth, res: Response) {
    try {
        const {id} = req.params
        const userID = req.user?.userID

        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }

        const existingEntry = await client.entry.findFirst({
            where: {
                noteID: id
            }
        })

        if(!existingEntry || existingEntry.authorID != userID) {
            return sendErrorResponse(res, {}, "Entry not found", 400)
        }

        const deletedEntry = await client.entry.update({
            data: {
                isDeleted: true
            },
            where: {
                noteID: id
            }
        })
        sendSuccessResponse(res, {deletedEntry}, "Entry deleted successfully")
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}