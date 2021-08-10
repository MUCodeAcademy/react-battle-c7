const bcrypt = require("bcrypt");
const pool = require("../config/pg.conf");
const { v4: uuidv4 } = require("uuid");

async function signup(res, username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (users.rows.length !== 0) {
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
    json = { ...json, error: "something went wrong" };
  } finally {
    return res.send(json);
  }
}

async function login(res, username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = users.rows[0] || { password: 1234 };
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      json = { ...json, success: true, data: { username, uuid: user.uuid } };
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
