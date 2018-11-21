const bcrypt = require('bcrypt');

const { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const decimalRadix = 10;
const saltRounds = parseInt(SALT_ROUNDS, decimalRadix);

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

const generateJWT = () => {
    return null;
};

// TODO: Integrate Typescript, generate enum
const checkJWT = () => {};

const authHelper = {
    generatePasswordHash,
    checkPasswordHash,
    generateJWT,
    checkJWT,
};

module.exports = authHelper;
