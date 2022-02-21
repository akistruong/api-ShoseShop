//MODEL
const Users = require("../models/User.model");

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (user && user.password == password) {
        res.json({ success: true, msg: "Đăng nhập thành công." });
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
    const { email, passsword, address, firstName, lastName, sex } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (user) {
        const newUser = new Users({
          email,
          passsword,
          address,
          firstName,
          lastName,
          sex,
        });
        const response = await newUser.save();
        if (response) {
          res.json({ success: true, msg: "Tạo tài khoản thành công" });
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
