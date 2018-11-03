require('dotenv').config();

// eslint-disable-next-line
const {
    DB_CLIENT_TEST,
    DB_HOST_TEST,
    DB_USER_TEST,
    DB_NAME_TEST,
    DB_PASS_TEST,
} = process.env;

module.exports = {
    client: DB_CLIENT_TEST,
    connection: {
        host: DB_HOST_TEST,
        database: DB_NAME_TEST,
        user: DB_USER_TEST,
        password: DB_PASS_TEST,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
};
