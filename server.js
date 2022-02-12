const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes/index.routes");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const mongoose = require("mongoose");
//
const Products = require("./models/Product.model");
//
//PORT
const PORT = process.env.PORT || 5000;
//ROUTE
route(app);

app.get("/products", async (req, res) => {
  await Products.deleteMany();
});
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => console.log("db connected..."))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log("server is running..."));