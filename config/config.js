import mongoose from "mongoose"

export const connectToDb = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("connected successfully to db")
    } catch (error) {
        console.log("error in connecting db", error)
    }
}