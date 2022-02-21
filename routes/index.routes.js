const ProductRoute = require("./Product.route");
const CategoryRoute = require("./Category.routes");
<<<<<<< HEAD
const AuthRoute = require("./Auth.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", AuthRoute);
=======
<<<<<<< HEAD
const UserRoute = require("./User.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", UserRoute);
=======
const UploadRoute = require("./Upload.route");
const routes = (app) => {
  app.use("/api", ProductRoute);
  app.use("/api", CategoryRoute);
  app.use("/api", UploadRoute);
>>>>>>> main
>>>>>>> main
};

module.exports = routes;
