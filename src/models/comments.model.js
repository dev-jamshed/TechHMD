const mongoose = require('mongoose');
const { Types } = mongoose;

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

const CommentsModel = mongoose.model("Comment", schema);
module.exports = { CommentsModel };