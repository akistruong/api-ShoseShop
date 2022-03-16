const JWT = require("../commom/jwtHelper");
require("dotenv").config();

const isLogin = async (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (Authorization) {
    console.log(Authorization);
    const Token = Authorization.split(" ")[1];
    if (Token) {
      try {
        const decode = await JWT.compareToken(
          Token,
          process.env.JWT_ACCESS_TOKEN_SECRET_KEY
        );
        if (decode) {
          req.user = decode.data;
          next();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(401).json({ success: false, msg: "Vui lòng đăng nhập" });
    }
  } else {
    res.status(401).json({ success: false, msg: "Vui lòng đăng nhập" });
  }
};

module.exports = isLogin;
