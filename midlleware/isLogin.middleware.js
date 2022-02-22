const JWT = require("../commom/jwtHelper");
require("dotenv").config();

const isLogin = (req, res, next) => {
  const Token = req.headers.authorization;
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
};

module.exports = isLogin;
