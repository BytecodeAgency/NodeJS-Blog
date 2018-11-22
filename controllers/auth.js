const { authHelper, knex } = require('../helpers');

const {
    calculateDates,
    generatePayload,
    generatePasswordHash,
    checkPasswordHash,
    generateJWT,
    decodeJWT,
    validateJWT,
} = authHelper;

const getUserByUsername = async username => {
    const user = await knex
        .select('*')
        .from('users')
        .where({ username });
    return user[0];
};

const generateToken = (username, password) => {

};

module.exports = {
    getUserByUsername,
    generateToken,
};
