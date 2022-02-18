class AuthController {
  async login(req, res, next) {
    res.json({ msg: "This is login " });
  }
}

module.exports = new AuthController();
