const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    arrivingDate: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    isActive:{
        type:String,
        default:true
    }
})


module.exports = new mongoose.model("placement", JobSchema)