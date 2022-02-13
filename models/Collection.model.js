const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollectionSchema = new Schema(
  {
    name: String,
    dsc: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collections", CollectionSchema, "Collections");
