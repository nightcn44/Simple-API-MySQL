const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  } catch (err) {
    console.error("Hashing Error:", err.message);
    throw new Error("Error hashing password" + err.message);
  }
};

module.exports = hashPassword;
