import { Request, Response } from "express";
import { Auth } from "../middleware/verifyToken";
import { sendErrorResponse } from "../helpers/error.helper";
import { client } from "../config/prisma.config";
import { sendSuccessResponse } from "../helpers/success.helper";

export async function createEntry(req: Auth, res: Response) {
    try {
        const {title, synopsis, content} = req.body
        const userID = req.user?.userID
        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }
                
        const newEntry = await client.entry.create({
            data: {
                noteTitle: title,
                synopsis,
                content,
                author: {
                    connect: {userID}
                }
            }
        })
        sendSuccessResponse(res, {newEntry}, "New entry created successfully", 201)
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! something went wrong")
    }
}

export async function getAllEntries(req: Request, res: Response) {
    try {
        const entries = await client.entry.findMany()
        sendSuccessResponse(res, {entries}, "Entries fetched successfully")
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

export async function getTrashedEntries(req: Auth, res: Response) {
    try {
        const userID = req.user?.userID
        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }

        const trashedEntries = await client.entry.findMany({
            where: {
                isDeleted: true
            }
        })

        sendSuccessResponse(res, {trashedEntries}, "Entries fetched successfully")

    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

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
                isDeleted: true
            },
            where: {
                noteID: id
            }
        })
        sendErrorResponse(res, {restoredEntry}, "Entry restored successfully")
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}