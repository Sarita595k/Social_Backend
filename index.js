import express from "express";
// import bodyParser, { urlencoded } from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv"
import { connectToDb } from "./config/config.js";
import userRoutes from "./src/routes/user.js";
import postRoutes from "./src/routes/posts.js";

dotenv.config()

const app = express()
app.use(cors({
    origin: 'https://avsarsocialmedia.netlify.app'
}))

app.use(express.json())
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Server is running",
        now: new Date().toLocaleString()
    })
})


app.use("/api/user", userRoutes)

app.use("/api/posts", postRoutes)

app.listen(process.env.PORT, () => {
    connectToDb()
    console.log("Server is running")
})