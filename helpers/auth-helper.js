const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN_DAYS } = process.env;

const decimalRadix = 10;
const saltRounds = parseInt(SALT_ROUNDS, decimalRadix);
const jwtExpiresInDays = parseInt(JWT_EXPIRES_IN_DAYS, decimalRadix);

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

const calculateDates = () => {
    const date = new Date();
    const issuedAt = date.setDate(date.getDate());
    const issuedAtDate = new Date(issuedAt);
    const expiryDate = date.setDate(issuedAtDate.getDate() + jwtExpiresInDays);
    const dates = {
        iat: issuedAt,
        exp: expiryDate,
    };
    return dates;
};

// TODO: Make it possible to mock payload of x days ago
const generatePayload = data => {
    const dates = calculateDates();
    const payload = {
        ...dates,
        data,
    };
    return payload;
};

const generateJWT = data => {
    const payload = generatePayload(data);
    const token = jwt.encode(payload, JWT_SECRET);
    return token;
};

const decodeJWT = token => {
    const decoded = jwt.decode(token, JWT_SECRET);
    return decoded;
};

const authHelper = {
    calculateDates,
    generatePayload,
    generatePasswordHash,
    checkPasswordHash,
    generateJWT,
    decodeJWT,
};

module.exports = authHelper;
