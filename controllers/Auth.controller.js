const Users = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            res.json({ success: true, msg: "Đăng nhập thành công." });
          } else {
            res.json({
              success: true,
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
          res.json({
            success: true,
            msg: "Tạo tài khoản thành công",
            body: response,
          });
        }
      } else {
        res.json({ success: false, msg: "Email đã tồn tại..." });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: "server error" });
    }
  }
  async facebook(req, res, next) {}
}

module.exports = new AuthController();
