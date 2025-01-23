const mongoose = require('mongoose');

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

const BlogsModel = mongoose.model("Blog", schema);
module.exports = { BlogsModel };