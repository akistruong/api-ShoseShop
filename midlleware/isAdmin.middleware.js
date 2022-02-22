const JWT = require("../commom/jwtHelper");
require("dotenv").config();
const isAdmin = (req, res, next) => {
  const Token = req.headers.authorization;
  if (Token) {
    const decode = JWT.compareToken(
      Token,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    );
    if (decode) {
      next();
    }
  } else {
    res.json("LOGIN THAT BAI");
  }
};

module.exports = isAdmin;
