const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS || 10;

const generatePasswordHash = async plainTextPassword => {
    const hashedPassword = await new Promise((resolve, reject) =>
        bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
            if (err) {
                reject(hash);
            }
            resolve(hash);
        }),
    ); // eslint-disable-line
    return hashedPassword;
};

const checkPasswordHash = async (plainTextPassword, hashedPassword) => {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (match) {
        return true;
    }
    return false;
};

const generateAuthToken = () => {};

const checkAuthToken = () => {};

const authHelper = {
    generatePasswordHash,
    checkPasswordHash,
    generateAuthToken,
    checkAuthToken,
};

module.exports = authHelper;
