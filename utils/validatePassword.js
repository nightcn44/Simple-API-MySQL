const bcrypt = require('bcrypt');

const validatePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error('Error validating password: ' + err);
    }
};

module.exports = validatePassword;
