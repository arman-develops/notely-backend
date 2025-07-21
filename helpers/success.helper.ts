import { Response } from "express";

function sendSuccessResponse<T>(res: Response, data: T, message: string, code:number = 200) {
    res.status(code).json({
        success: true,
        message,
        data
    })
}

export {sendSuccessResponse}