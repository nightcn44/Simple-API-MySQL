const jwt = require('jsonwebtoken');

// generate token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
};

module.exports = { generateToken };