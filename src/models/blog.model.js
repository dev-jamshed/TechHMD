import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    cover: String,
    metaTitle: String,
    metaDescription: String,
},
    {
        timestamps: true
    }
)

export const BlogsModel = mongoose.model("Blog", schema)