const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
const AuthRoute = require("./Auth.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", AuthRoute);
};

module.exports = routes;
