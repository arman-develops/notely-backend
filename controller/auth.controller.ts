import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendErrorResponse } from "../helpers/error.helper";
import { client } from "../config/prisma.config";
import { generateToken } from "../utils/token.utils";
import { sendSuccessResponse } from "../helpers/success.helper";

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
                username: user.username
            }
            const jwt_token = generateToken(jwt_payload)
            sendSuccessResponse(res, {jwt_token}, "user created successfully", 201)
        })
    } catch (error) {
        sendErrorResponse(res, {error}, "Error registering your profile. Try again")
        console.log(error);
    }
}