require('dotenv').config();

// eslint-disable-next-line
const {
    KNEX_DEBUG,
    DB_CLIENT,
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASS,
} = process.env;

const debug = KNEX_DEBUG === 'true';

module.exports = {
    client: DB_CLIENT,
    connection: {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
    debug,
    asyncStackTraces: debug,
};
