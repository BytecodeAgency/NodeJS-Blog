const { authHelper } = require('../helpers');
const { Users } = require('./');

// eslint-disable-next-line
const { checkPasswordHash, generateJWT, decodeJWT, validateJWT } = authHelper;

const getUserByUsername = async (knex, username) => {
    const user = await knex
        .select('*')
        .from('users')
        .where({ username });
    return user[0];
};

const authenticateUser = async (knex, username, password) => {
    const user = await getUserByUsername(knex, username);
    const passwordHash = user.password;
    const correctPassword = await checkPasswordHash(password, passwordHash);
    if (correctPassword) {
        return true;
    }
    return false;
};

const generateTokenPayload = async (knex, username) => {
    const user = await getUserByUsername(knex, username);
    const { id, email } = user;
    const tokenPayload = { id, username, email };
    return tokenPayload;
};

const generateToken = async (knex, username, password) => {
    const isAuthenticated = await authenticateUser(knex, username, password);
    if (!isAuthenticated) {
        throw new Error('Incorrect credentials');
    }
    const payloadData = await generateTokenPayload(knex, username);
    const token = generateJWT(payloadData);
    return token;
};

const validateToken = async (knex, token) => {
    let decodedToken = null;

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
    try {
        const tokenUserID = decodedToken.data.id;
        const tokenUser = await Users.getUser(knex, tokenUserID);
        if (!tokenUser) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = {
    getUserByUsername,
    authenticateUser,
    generateTokenPayload,
    generateToken,
    validateToken,
};
