const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
const AuthRoute = require("./Auth.route");
const UploadRoute = require("./Upload.route");
const UserRoute = require("./User.route");
const MessageRoute = require("./Message.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", UploadRoute);
  app.use("/api", AuthRoute);
  app.use("/api", UserRoute);
  app.use("/api", MessageRoute);
};

module.exports = routes;
