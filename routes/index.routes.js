const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
const UploadRoute = require("./Upload.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", UploadRoute);
};

module.exports = routes;
