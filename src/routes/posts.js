import express from "express"
import { createPost, getAllPost } from "../controllers/posts.js"
import { isLoggedIn } from "../middlewares/auth.js"
const postRoutes = express.Router()

postRoutes.get('/allPosts', getAllPost)
postRoutes.post("/create", isLoggedIn, createPost)

export default postRoutes