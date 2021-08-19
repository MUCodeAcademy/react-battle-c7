const bcrypt = require("bcrypt");
const query = require("../config/pg.conf");
const { v4: uuidv4 } = require("uuid");

async function signup(res, username, password) {
  //! check if username in use
  let json = { data: null, success: false, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length !== 0) {
      json.error = "Username already taken";
    } else {
      const hashed = await bcrypt.hash(password, 10);
      const uuid = uuidv4();
      await query(
        "INSERT INTO users (password, username, uuid) VALUES (?,?,?)",
        [hashed, username, uuid]
      );
      json = { ...json, success: true };
    }
  } catch (err) {
    json.error = "Something went wrong?";
  } finally {
    return res.send(json);
  }
}

async function login(username, password) {
  let json = { data: null, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = users[0] || { password: "1234" };
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      json = { ...json, data: { username, uuid: user.uuid } };
    } else {
      json.error = "Invalid username / password";
    }
  } catch (err) {
    json.error = "Something went wrong?";
  } finally {
    return json;
  }
}

async function getByUserID(uuid) {
  let json = { error: null, data: null };
  try {
    const users = await query(
      "SELECT id, username, uuid FROM users WHERE uuid = ?",
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

async function getByUsername(res, username) {
  let json = { success: false, error: null, data: null };
  try {
    const users = await query(
      "SELECT id, username, uuid FROM users WHERE username = ?",
      [username]
    );
    if (users.length === 0) {
      json.error = "No user found";
    } else {
      json = { ...json, success: true, data: users[0] };
    }
  } catch (err) {
    json.error = "Something went wrong?";
  } finally {
    return res.send(json);
  }
}

async function getAllUsers(res) {
  let json = { success: false, error: null, data: null };
  try {
    const users = await query("SELECT id, username, uuid FROM users");
    if (users.length === 0) {
      json.error = "No users found";
    } else {
      json = { ...json, success: true, data: users };
    }
  } catch (err) {
    json.error = "Something went wrong?";
  } finally {
    return res.send(json);
  }
}

module.exports = { signup, login, getAllUsers, getByUserID, getByUsername };
