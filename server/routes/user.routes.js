const express = require("express");
const router = express.Router();
const { signup, login } = require("../models/user.models");

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
  });
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
