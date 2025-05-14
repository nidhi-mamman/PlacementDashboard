const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tel: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  isPlacementOfficer: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("User", userSchema);
