import { Request, Response } from "express"

export async function indexController (_req:Request, res: Response) {
    res.status(200).json({
        success: true,
        data: {
            message: "index route reached"
        }
    })
}