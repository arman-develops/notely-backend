import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.get("/", (_req:Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: {
            message: "index route reached"
        }
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})