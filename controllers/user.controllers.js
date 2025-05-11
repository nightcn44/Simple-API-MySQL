const { pool } = require("../config/db");
const hashPassword = require("../utils/hashPassword");

exports.getAllUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const [results] = await pool.query(query);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  try {
    const query = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
    const values = [username, userId];

    if (password) {
      const hashedPassword = await hashPassword(password);
      query = `UPDATE users SET username = ?, password = ? WHERE id = ?`;
      values.push(hashedPassword);
    }

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await pool.query(query, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
