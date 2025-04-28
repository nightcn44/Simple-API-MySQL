const bcrypt = require('bcrypt');

// validate password
const validatePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error('Error validating password');
    }
};

module.exports = validatePassword;
