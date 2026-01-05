import mongoose, { mongo, Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    }, caption: {
        type: String,
        required: true,
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    {
        timestamps: true
    })

export const Post = mongoose.model('Post', PostSchema)