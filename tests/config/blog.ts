const knexGenerator = require('knex');
const generateKnexfile = require('../../database/generate-knexfile');

const knexConfig = {
    client: process.env.DB_CLIENT_TEST,
    host: process.env.DB_HOST_TEST,
    user: process.env.DB_USER_TEST,
    database: process.env.DB_NAME_TEST,
    password: process.env.DB_PASS_TEST,
    debug: process.env.KNEX_DEBUG === 'true',
};

const knexfile = generateKnexfile(knexConfig);
const blog = knexGenerator(knexfile);

export default blog;
