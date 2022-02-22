require("dotenv").config();
const jwt = require("jsonwebtoken");
class JWT {
  accessToken(yourHash, privateKey, ex = "1d") {
    const token = jwt.sign(
      {
        data: yourHash,
      },
      privateKey,
      { expiresIn: ex }
    );
    return token;
  }
  compareToken() {}
}

module.exports = new JWT();
