const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vipulronaldo07:tmqY8MW1rWodaf9w@vipulnode.c4ivx.mongodb.net/"
  );
};
module.exports = connectDB;
