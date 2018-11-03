require('dotenv').config();
const getKnexInstance = require('knex');

const knexfileNormal = require('../knexfile');
const knexfileTest = require('../knexfile-test');

const getKnexfile = NODE_ENV => {
    if (NODE_ENV === 'TEST') {
        return knexfileTest;
    }
    return knexfileNormal;
};

const db = (NODE_ENV = process.env.NODE_ENV) => {
    const knexfile = getKnexfile(NODE_ENV);
    const knex = getKnexInstance(knexfile);
    return knex;
};

const knex = db();
module.exports = knex;
