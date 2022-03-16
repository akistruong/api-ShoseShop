const Users = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = require("../commom/jwtHelper");
require("dotenv").config();
const saltRounds = 10;
const passport = require("../commom/FacebookApi");
class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            const Token = JWT.accessToken(
              { email: user.email },
              process.env.JWT_ACCESS_TOKEN_SECRET_KEY
            );
            res.json({ success: true, msg: "Đăng nhập thành công.", Token });
          } else {
            res.json({
              success: false,
              msg: "Mật khẩu không chính xác.",
            });
          }
        });
      } else {
        res.json({
          success: true,
          msg: "Tài khoản hoặc mật khẩu không chính xác.",
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: "server error" });
    }
  }
  async register(req, res, next) {
    const { email, password, address, firstName, lastName, sex } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        //Hash Password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new Users({
          email,
          password: hash,
          address,
          firstName,
          lastName,
          sex,
        });
        const response = await newUser.save();
        if (response) {
          const Token = JWT.accessToken(
            { email },
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY
          );
          res.json({
            success: true,
            msg: "Tạo tài khoản thành công",
            body: response,
            Token,
          });
        }
      } else {
        res.json({ success: false, msg: "Email đã tồn tại..." });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: "server error" });
    }
  }
  async AdminLogin(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (user) {
        if (user.role == "1") {
          bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
              const Token = JWT.accessToken(
                { email: user.email },
                process.env.JWT_ACCESS_TOKEN_SECRET_KEY
              );
              res.json({ success: true, msg: "Đăng nhập thành công.", Token });
            } else {
              res.json({
                success: false,
                msg: "Mật khẩu không chính xác.",
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: "Tài khoản hoặc mật khẩu không chính xác.",
          });
        }
      } else {
        res.json({
          success: false,
          msg: "Tài khoản hoặc mật khẩu không chính xác.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "server error" });
    }
  }
  async facebook(req, res, next) {
    // res.json({ data: req.profile });
  }
  async refreshToken(req, res, next) {}
  async Auth(req, res, next) {
    const Authorization = req.headers.authorization;
    if (Authorization) {
      console.log(Authorization);
      const Token = Authorization.split(" ")[1];

      try {
        if (Token) {
          const decode = await JWT.compareToken(
            Token,
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY
          );
          if (decode) {
            const email = decode.data.email;
            const user = await Users.findOne({ email });
            if (user) {
              if (user.role == "1") {
                res.json({ isAdmin: true, msg: "Xác thực thành công" });
              } else {
                res.json({ isUser: true, msg: "Xác thực thành công" });
              }
            }
          }
        }
      } catch (error) {
        res.json({ success: false, msg: "Token invalid" });
      }
    } else {
      res.status(401).json({ success: false, msg: "Vui lòng đăng nhập" });
    }
  }
}

module.exports = new AuthController();
