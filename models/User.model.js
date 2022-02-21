const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  address: Object,
  avatar: String,
  sex: Boolean,
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
module.exports = mongoose.model("User", UserSchema, "User");
