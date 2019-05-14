const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  restaurantId: [Object]
});

module.exports = mongoose.model("User", UserSchema);
