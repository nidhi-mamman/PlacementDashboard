const mongoose = require("mongoose")
const NoticeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("Notice", NoticeSchema)