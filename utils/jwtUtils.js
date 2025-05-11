const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: process.env.JWT_EXPIRATION };
  return jwt.sign(payload, secret, options);
};

module.exports = { generateToken };
