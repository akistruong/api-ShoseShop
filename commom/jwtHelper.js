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
    return new Promise((resolve, reject) => {
      jwt.verify(yourToken, privateKey, function (err, decoded) {
        if (err) {
          reject(err);
        }
        if (decoded) {
          resolve(decoded);
        }
      });
    });
  }
}

module.exports = new JWT();
