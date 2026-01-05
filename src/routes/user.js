import express from "express"
import { User } from "../model/user.js"
import { loginUser, signupUser } from "../controllers/user.js"
const userRoutes = express.Router()

userRoutes.post('/signup', signupUser)
userRoutes.post('/login', loginUser)

export default userRoutes