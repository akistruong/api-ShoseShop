const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
const MessageSchema = new Schema(
  {
    msg: String,
    productId: {
      type: mongoose.Types.ObjectId(),
      ref: "Products",
    },
    userId: {
      type: mongoose.Types.ObjectId(),
      ref: "User",
    },
    reply: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema, "Messages");
