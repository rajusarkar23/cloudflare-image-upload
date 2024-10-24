import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT

import uploadRouter from "./routes/imageupload"
app.use("/api/v1", uploadRouter)

app.listen(PORT,() => {
    console.log(`The server is up and running on port ${PORT}`);
})