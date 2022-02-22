require("dotenv").config();
const res = require("express/lib/response");
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
  compareToken(yourToken, privateKey) {
    let data;
    jwt.verify(yourToken, privateKey, function (err, decoded) {
      if (err) throw err;
      if (decoded) {
        data = decoded;
      }
    });
    return data;
  }
}

module.exports = new JWT();
