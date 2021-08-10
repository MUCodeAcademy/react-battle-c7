const bcrypt = require("bcrypt");
const pool = require("../config/pg.conf");
const { v4: uuidv4 } = require("uuid");

async function signup(res, username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (users.rows.length != 0) {
      console.log(users);
      json = { ...json, error: "Username already taken" };
    } else {
      const hashed = await bcrypt.hash(password, 10);
      const uuid = uuidv4();
      await pool.query(
        "INSERT INTO users (password, username, uuid) VALUES ($1,$2,$3)",
        [hashed, username, uuid]
      );
      json = { ...json, success: true };
    }
  } catch (err) {
    console.log(err);
    json = { ...json, error: "something went wrong" };
  } finally {
    console.log(json);
    return res.send(json);
  }
}

async function login(res, username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = users[0] || { password: 1234 };
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      json = { ...json, data: { username, uuid: user.uuid } };
      console.log(json);
    } else {
      json = { ...json, error: "Invalid username and/or password" };
    }
  } catch (err) {
    json = { ...json, error: "something went wrong" };
  } finally {
    return res.send(json);
  }
}

module.exports = { signup, login };
