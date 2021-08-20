const passport = require("passport");

async function auth(req, res, next) {
  passport.authenticate("jwt", (err, user, info) => {
    console.log("err:", err, "user:", user, "info:", info);
    if (err || info) {
      return res.send({
        success: false,
        data: null,
        error: "Invalid Credentials",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = auth;
