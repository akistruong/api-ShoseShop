const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
};

module.exports = routes;
