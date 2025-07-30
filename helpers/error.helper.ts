import { Response } from "express";

function sendErrorResponse<T>(
  res: Response,
  data: T,
  message: string,
  code: number = 500,
) {
  res.status(code).json({
    success: false,
    message,
    data,
  });
}

export { sendErrorResponse };
