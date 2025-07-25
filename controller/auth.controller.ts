import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { sendErrorResponse } from "../helpers/error.helper";
import { client } from "../config/prisma.config";
import { generateToken } from "../utils/token.utils";
import { sendSuccessResponse } from "../helpers/success.helper";
import { Auth } from "../middleware/verifyToken";

export async function createUser(req: Request, res: Response) {
    try {
        const {firstName, lastName, email, password, username} = req.body
        const saltRounds = 10
        
        bcrypt.hash(password, saltRounds, async(err, hash) => {
            if(err) {
                sendErrorResponse(res, {err}, "Oops soemthing broke. Try again later")
                console.log("Error hashing password");
                
            }
            const user = await client.user.create({
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: hash as string
                }
            })
            const jwt_payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                profileID: user.profileID,
                userID: user.userID,
                email: user.email,
                username: user.username,
                hasCompletedOnboarding: false
            }
            const jwt_token = generateToken(jwt_payload)
            sendSuccessResponse(res, {user: jwt_payload, jwt_token}, "user created successfully", 201)
        })
    } catch (error) {
        sendErrorResponse(res, {error}, "Error registering your profile. Try again")
        console.log(error);
    }
}

export async function login(req: Request, res: Response) {
    const {identifier, password} = req.body

    const user = await client.user.findFirst({
        where: {
            OR: [
                {username: identifier},
                {email: identifier}
            ]
        }
    })

    if(!user) {
        sendErrorResponse(res, {
            error: "Invalid credentials"
        }, "Your credentials are invalid. Please try again!!")
        return
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        sendErrorResponse(res, {
            error: "invalid credentials"
        }, "Invalid username/email or password. Could not login")
        return
    }

    const payload = {
        userID: user.userID,
        profileID: user.profileID,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        hasCompletedOnboarding: false
    }

    const jwt_token = generateToken(payload)

    sendSuccessResponse(res, {
        user:payload,
        jwt_token
    }, "login successful")
}

export async function updatePassword(req: Auth, res: Response) {
    
    try {
        const {currentPassword, newPassword} = req.body
        const userID = req.user?.userID
        if (!userID || !currentPassword || !newPassword) {
            return sendErrorResponse(res, {error: "missing credentials"}, "Missing credentials");
        }
        const user = await client.user.findUnique({ where: { userID } });
        if (!user) {
            return sendErrorResponse(res, { notFound: true }, "User not found", 404);
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return sendErrorResponse(res, { passwordError: true }, "Incorrect current password", 401);
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await client.user.update({
            where: { userID },
            data: { password: hashedNewPassword },
        });

        sendSuccessResponse(res, {}, "Password updated successfully")
    } catch(error) {
        console.log(error);
        sendErrorResponse(res, {error}, "Oops, something went wrong")   
    }

}

export async function logout(_req: Request, _res: Response) {
    console.log("user logged out");
}

export async function userOnboarding(req: Auth, res: Response) {
    try {
        const userID = req.user?.userID
        const {bio, avatar, preferences, hasCompletedOnboarding, firstNote} = req.body
        const onboardUser = await client.user.update({
            data: {
                bio,
                avatar,
                preferences,
                hasCompletedOnboarding: true
            },
            where: {
                userID
            },
            select: {
                bio: true,
                email: true,
                firstName: true,
                lastName: true,
                username: true,
                preferences: true,
                hasCompletedOnboarding: true,
                avatar: true,
                profileID: true
            }
        })

        const veryFirstNote = await client.entry.create({
            data: {
                noteTitle: firstNote.title,
                synopsis: firstNote.synopsis,
                content: firstNote.content,
                author: {
                    connect: {userID}
                }
            },
        })

        sendSuccessResponse(res, {user: onboardUser, }, "User onboarding successful")
    } catch(error) {
        sendErrorResponse(res, {error}, "Oops, something went wrong")   
    }
}