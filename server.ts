import express from 'express'
import dotenv from 'dotenv'
import indexRouter from './routes/index.route'
dotenv.config()

const app = express()

app.use(indexRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})