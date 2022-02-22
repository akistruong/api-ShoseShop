const req = require("express/lib/request");
const passport = require("passport");
const passportfacebook = require("passport-facebook").Strategy;
require("dotenv").config();

passport.use(
  new passportfacebook(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/api/facebook-callback",
      profileFields: [
        "id",
        "gender",
        "picture.type(large)",
        "emails",
        "displayName",
        "name",
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //     console.log(user);
      //     return cb(err, user);
      //   });
      //   req.profile = profile;
      //   next();
      console.log(profile);
    }
  )
);
module.exports = passport;
