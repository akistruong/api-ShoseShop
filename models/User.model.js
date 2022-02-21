const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  address: Object,
  avatar: String,
  sex: Boolean,
});
module.exports = mongoose.model("User", UserSchema, "User");
