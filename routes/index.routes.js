const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
const AuthRoute = require("./Auth.route");
const UploadRoute = require("./Upload.route");
const UserRoute = require("./User.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", UploadRoute);
  app.use("/api/auth", AuthRoute);
  app.use("/api", UserRoute);
};

module.exports = routes;
