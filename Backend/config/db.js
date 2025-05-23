const mongoose = require("mongoose");

const createDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = createDB;
