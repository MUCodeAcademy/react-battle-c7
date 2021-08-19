const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../middleware/auth.middleware");
const { signup, login } = require("../models/user.models");

router.get("/validate", auth, (req, res) => {
  return res.send({
    success: true,
    error: null,
    data: { username: req.user.username },
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.send({ success: true, error: null, body: null });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (validate(username, password)) {
    return signup(res, username, password);
  }
  return res.send({
    success: false,
    data: null,
    error: "invalid data provided",
  });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (validate(username, password)) {
    return login(res, username, password);
  }
  return res.send({
    success: false,
    data: null,
    error: "INVALID DATA PROVIDED",
  }

passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.send({ success: false, error: err, data: null });
    }
    return res
      .cookie("jwt", info.token, { secure: true, httpOnly: true })
      .send({ success: true, error: null, data: user });
  })(req, res);
});



function validate(username, password) {
  return (
    username &&
    username.length >= 5 &&
    username.length <= 20 &&
    password &&
    password.length >= 5 &&
    password.length <= 20
  );
}
module.exports = router;