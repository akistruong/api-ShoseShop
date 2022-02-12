const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
const UserRoute = require("./User.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", UserRoute);
};

module.exports = routes;
