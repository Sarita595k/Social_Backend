import { User } from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 30 })
        res.status(201).json({
            status: "Success",
            message: "User created successfully",
            token,
            username: user.username
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "Failed",
            error: err.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "Email does not exist",
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid password",
            })
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 30 })
        res.status(200).json({
            status: "success",
            message: "Login successfully",
            token,
            username: user.username
        })

    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "Failed",
            error: err.message
        })
    }
}