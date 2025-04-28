const { pool } = require('../config/db');

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const [results] = await pool.query(query);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  const userId =  req.params.id;
  try {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;
  try {
    const query = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
    const [result] = await pool.query(query, [username, email, password, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.query(query, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};