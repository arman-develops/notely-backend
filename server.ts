import express, { json } from 'express'
import dotenv from 'dotenv'
import indexRouter from './routes/index.route'
import authRouter from './routes/auth.route'
import entriesRouter from './routes/entries.route'
import entryRouter from './routes/entry.route'
dotenv.config()

const app = express()

app.use(json())
app.use(indexRouter)
app.use("/api/auth", authRouter)
app.use("/api/entries", entriesRouter)
app.use("/api/entry", entryRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})