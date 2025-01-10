import mongoose, { Types } from 'mongoose'

const schema = new mongoose.Schema({
    blog: {
        type: Types.ObjectId,
        ref: "Blog",
    },
    // guest user
    user: {
        name: String,
    },
    comment: {
        type: String,
        trim: true,
        required: true,
    },
})

export const CommentsModel = mongoose.model("Comment", schema)