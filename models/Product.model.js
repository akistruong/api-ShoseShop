const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
const createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");
const ProductSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    sizes: Array,
    colors: Array,
    dsc: String,
    stars: Array,
    sex: String,
<<<<<<< HEAD
    collections: { type: Schema.Types.ObjectId, ref: "Collections" },
=======
    imgs: String,
>>>>>>> Product
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", ProductSchema, "Products");
