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

export async function getAllEntries(req: Auth, res: Response) {
    const userID = req.user?.userID
    try {
        const entries = await client.entry.findMany({
            where: {
                authorID: userID
            }
        })
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
                isDeleted: true,
                authorID: userID
            }
        })

        sendSuccessResponse(res, {trashedEntries}, "Entries fetched successfully")

    } catch (error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

export async function getPinnedEntries(req: Auth, res: Response) {
    try {
        const userID = req.user?.userID
        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }

        const pinnedEntries = await client.entry.findMany({
            where: {
                authorID: userID,
            }
        })
        sendSuccessResponse(res, {pinnedEntries}, "Pinned Entries fetched successfully")
    } catch (error) {
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}

export async function getBookMarkedEntries(req: Auth, res: Response) {
    try {
        const userID = req.user?.userID
        if(!userID) {
            return sendErrorResponse(res, {authError: "Authorization failed"}, "unauthorized", 401)
        }

        const bookMarkedEntries = await client.entry.findMany({
            where: {
                authorID: userID,
            }
        })
        sendSuccessResponse(res, {bookMarkedEntries}, "Bookmarked Entries fetched successfully")
    } catch (error) {
        sendErrorResponse(res, {error}, "Oops! Something went wrong")
    }
}