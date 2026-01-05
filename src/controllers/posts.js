import { Post } from "../model/post.js"

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user')
        res.status(201).json({
            status: "Success",
            message: "Post fetched successfully",
            posts
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: "Error in fetching post",
            error: err.message
        })
    }
}
export const createPost = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body
        const { id } = req.user
        await Post.create({ imageUrl, caption, user: id })
        res.status(201).json({
            status: "Success",
            message: "Post created successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: "Error in creating post",
            error: err.message
        })
    }
}