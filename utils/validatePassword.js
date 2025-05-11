const bcrypt = require("bcryptjs");

const validatePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Invalid password format", err.message);
    throw new Error("Error validating password: " + err.message);
  }
};

module.exports = validatePassword;
