const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  address: Object,
  avatar: String,
});
