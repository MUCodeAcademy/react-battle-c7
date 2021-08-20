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
    console.log(err);
    json = { ...json, error: "something went wrong" };
  } finally {
    return res.send(json);
  }
}

async function login(username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    const user = users.rows[0] || { password: "1234" };

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      json = { ...json, success: true, data: { username, uuid: user.uuid } };
    } else {
      json = { ...json, error: "Invalid username and/or password" };
    }
  } catch (err) {
    console.log(err);
    json = { ...json, error: "something went wrong" };
  } finally {
    return json;
  }
}
async function getByUserID(uuid) {
  let json = { error: null, data: null };
  try {
    const users = await query(
      "SELECT id, username, uuid FROM users WHERE uuid = $1",
      [uuid]
    );
    if (users.length === 0) {
      json.error = "No user found";
    } else {
      json = { ...json, data: users[0] };
    }
  } catch (err) {
    json.error = "Something went wrong?";
  } finally {
    return json;
  }
}

module.exports = { signup, login, getByUserID };
