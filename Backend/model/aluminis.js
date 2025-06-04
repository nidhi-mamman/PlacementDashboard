const mongoose = require("mongoose")
const company = require("./company")

const aluminiSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    passout: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    linkedin: {
        type: String
    }
})


module.exports = new mongoose.model("Alumini", aluminiSchema)