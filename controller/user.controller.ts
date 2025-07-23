import { Response } from "express";
import { Auth } from "../middleware/verifyToken";
import { client } from "../config/prisma.config";
import { sendErrorResponse } from "../helpers/error.helper";

export async function updateUserInfo(req: Auth, res:Response) {
  
    const userID = req.user?.userID
    const {
        firstName,
        lastName,
        username,
        email,
        avatar
    } = req.body;

  if (!userID) {
    return res.status(400).json({ error: "userID is required" });
  }

  try {
    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(username && { username }),
      ...(email && { email }),
      ...(avatar && { avatar }),
      lastProfileUpdate: new Date(),
    };

    const updatedUser = await client.user.update({
      where: { userID },
      data: updateData,
    });

    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update failed:", error);
    sendErrorResponse(res, {error}, "Oops! Something went wrong")
  }
}