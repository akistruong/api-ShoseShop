const JWT = require("../commom/jwtHelper");
const Users = require("../models/User.model");

require("dotenv").config();
const isAdmin = async (req, res, next) => {
  const Token = req.headers.authorization;
  console.log({ USERS: req.user });
  const email = req.user.email;
  if (email) {
    try {
      const response = await Users.findOne({ email });
      if (response.role == "1") {
        next();
      } else {
        res.status(401).json("Không đủ quyền truy cập");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json("Chưa đăng nhập..");
  }
};

module.exports = isAdmin;
