require('dotenv').config();
const getKnexInstance = require('knex');

const knexfileNormal = require('../knexfile');
const knexfileTest = require('../knexfile-test');

const getKnexfile = NODE_ENV => {
    const knexFile = NODE_ENV === 'TEST' ? knexfileTest : knexfileNormal;
    return knexFile;
};

const db = (NODE_ENV = process.env.NODE_ENV) => {
    const knexfile = getKnexfile(NODE_ENV);
    const knex = getKnexInstance(knexfile);
    return knex;
};

const knex = db();
module.exports = knex;
