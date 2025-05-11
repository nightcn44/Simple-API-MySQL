const { pool } = require("../config/db");
const hashPassword = require("../utils/hashPassword");
const validatePassword = require("../utils/validatePassword");
const { generateToken } = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [existing] = await pool.query(query, [username]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await pool.query(insertQuery, [username, hashedPassword]);

    res.status(201).json({ message: "Register success" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json("Internal server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Username not found" });
    }

    const user = rows[0];

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json("Internal server error");
  }
};
