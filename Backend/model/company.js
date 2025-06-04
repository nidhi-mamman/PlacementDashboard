const mongoose = require("mongoose")
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    },
    remark: {
        type: String
    }
})

module.exports = new mongoose.model("Company", companySchema)