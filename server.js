const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes/index.routes");
const Products = require("./models/Product.model");
const Collections = require("./models/Collection.model");
const Users = require("./models/User.model");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const mongoose = require("mongoose");
//

//
//PORT
const PORT = process.env.PORT || 5000;
//ROUTE
route(app);

app.get("/products", async (req, res) => {
  await Products.deleteMany();
});
app.get("/collections", async (req, res) => {
  let rsp = await Collections.deleteMany();

  return res.json({ count: rsp.deletedCount });
});
app.get("/users", async (req, res) => {
  let rsp = await Users.deleteMany();

  return res.json({ count: rsp.deletedCount });
});
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => console.log("db connected..."))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log("server is running .."));
