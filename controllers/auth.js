const { authHelper, knex } = require('../helpers');
const { Users } = require('./');

// eslint-disable-next-line
const { checkPasswordHash, generateJWT, decodeJWT, validateJWT } = authHelper;

const getUserByUsername = async username => {
    const user = await knex
        .select('*')
        .from('users')
        .where({ username });
    return user[0];
};

const authenticateUser = async (username, password) => {
    const user = await getUserByUsername(username);
    const passwordHash = user.password;
    const correctPassword = await checkPasswordHash(password, passwordHash);
    if (correctPassword) {
        return true;
    }
    return false;
};

const generateTokenPayload = async username => {
    const user = await getUserByUsername(username);
    const { id, email } = user;
    const tokenPayload = { id, username, email };
    return tokenPayload;
};

const generateToken = async (username, password) => {
    const isAuthenticated = await authenticateUser(username, password);
    if (!isAuthenticated) {
        throw new Error('Incorrect credentials');
    }
    const payloadData = await generateTokenPayload(username);
    const token = generateJWT(payloadData);
    return token;
};

const validateToken = async token => {
    let decodedToken = '';

    // Check if token can be decoded, is valid format
    try {
        decodedToken = decodeJWT(token);
    } catch (err) {
        return false;
    }

    // Check if token has not expired
    try {
        validateJWT(token);
    } catch (err) {
        return false;
    }

    // Check if user from payload exists
    const tokenUserID = decodedToken.data.id;
    const tokenUser = await Users.getUser(tokenUserID);
    if (!tokenUser) {
        return false;
    }
    return true;
};

module.exports = {
    getUserByUsername,
    authenticateUser,
    generateTokenPayload,
    generateToken,
    validateToken,
};
