const bcrypt = require("bcrypt");
const { pool } = require("../config/pg.conf");
const { v4: uuidv4 } = require("uuid");

async function signup(res, username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length !== 0) {
      json = { ...json, error: "Username already taken" };
    } else {
      const hashed = await bcrypt.hash(password, 10);
      const uuid = uuidv4();
      await pool.query(
        "INSERT INTO users (password, username, uuid) VALUES (?,?,?)",
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
