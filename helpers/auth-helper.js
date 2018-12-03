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
                reject(err);
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

const calculateDates = issuedAtParam => {
    const date = new Date();
    const issuedAt = issuedAtParam || date.setDate(date.getDate());
    const issuedAtDate = new Date(issuedAt);
    const expiryDate = issuedAtDate.setDate(issuedAtDate.getDate() + jwtExpiresInDays);
    const dates = {
        iat: issuedAt,
        exp: expiryDate,
    };
    return dates;
};

const generatePayload = (data, issuedAt) => {
    const dates = calculateDates(issuedAt);
    const payload = {
        ...dates,
        data,
    };
    return payload;
};

const generateJWT = (data, issuedAt) => {
    const payload = generatePayload(data, issuedAt);
    const token = jwt.encode(payload, JWT_SECRET);
    return token;
};

const decodeJWT = token => {
    const decoded = jwt.decode(token, JWT_SECRET);
    return decoded;
};

const validateJWT = token => {
    const decoded = decodeJWT(token);
    const date = new Date();
    const now = date.setDate(date.getDate());
    if (decoded.exp < now) {
        throw new Error('Token expired');
    }
    return { ...decoded, now };
};

const authHelper = {
    calculateDates,
    generatePayload,
    generatePasswordHash,
    checkPasswordHash,
    generateJWT,
    decodeJWT,
    validateJWT,
};

module.exports = authHelper;
