require('dotenv').config();

const getKnexInstance = require('knex');
const generateKnexfile = require('../database/generate-knexfile');

const knexfile = generateKnexfile();
const knex = getKnexInstance(knexfile);

module.exports = knex;
