const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error('Error hashing password: ' + err);
  }
};

module.exports = hashPassword;