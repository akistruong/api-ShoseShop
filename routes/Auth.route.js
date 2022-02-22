const router = require("express").Router();
const passport = require("../commom/FacebookApi");
const AuthController = require("../controllers/Auth.controller");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get(
  "/login-with-facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] }),
  AuthController.facebook
);
//GET - REFRESHTOKEN
router.get("/refresh-token", AuthController.refreshToken);
//GET - FacebookLogin - callback url
router.get(
  "/facebook-callback",
  passport.authenticate(
    "facebook",
    { failureRedirect: "/api/login" },
    (req, res) => {
      return res.redirect("/api/products");
    }
  )
);
router.get("/facebook-success", (req, res, next) => {
  console.log("SUCCESS");
  res.send("login success");
});
router.get("/facebook-fail", (req, res, next) => {
  res.send("login fail");
});
module.exports = router;
