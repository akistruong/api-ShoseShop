const JWT = require("../commom/jwtHelper");
require("dotenv").config();

const isLogin = (req, res, next) => {
  const Authorization = req.headers["authorization"];
  const Token = Authorization.split(" ")[1];
  if (Authorization) {
    if (Token) {
      const decode = JWT.compareToken(
        Token,
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY
      );
      if (decode) {
        req.user = decode.data;
        next();
      }
    } else {
      res.status(401).json("Vui lòng đăng nhập.");
    }
  } else {
    res.status(401).json("Vui lòng đăng nhập.");
  }
};

module.exports = isLogin;
