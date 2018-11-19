/* eslint-disable object-curly-newline */

const {
    NODE_ENV,
    KNEX_DEBUG,
    DB_CLIENT_TEST,
    DB_HOST_TEST,
    DB_USER_TEST,
    DB_NAME_TEST,
    DB_PASS_TEST,
    DB_CLIENT,
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASS,
} = process.env;

const getNodeEnvSpecificDefaults = env => {
    const environment = env || NODE_ENV;
    if (environment === 'test') {
        return {
            client: DB_CLIENT_TEST,
            host: DB_HOST_TEST,
            database: DB_NAME_TEST,
            user: DB_USER_TEST,
            password: DB_PASS_TEST,
        };
    }
    return {
        client: DB_CLIENT,
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
    };
};

const defaults = {
    debug: KNEX_DEBUG === 'true',
    ...getNodeEnvSpecificDefaults(),
};

const getConfigEntry = (item, value) => {
    const configEntry = value || defaults[item];
    return configEntry;
};

const generateKnexConfig = (nodeBlogConfig = {}) => {
    const { client, host, database, user, password, debug } = nodeBlogConfig;
    const config = {
        client: getConfigEntry('client', client),
        connection: {
            host: getConfigEntry('host', host),
            database: getConfigEntry('database', database),
            user: getConfigEntry('user', user),
            password: getConfigEntry('password', password),
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations',
        },
        debug: getConfigEntry('debug', debug),
        asyncStackTraces: getConfigEntry('debug', debug),
        seeds: {
            directory: './database/seeds',
        },
    };

    return config;
};

module.exports = generateKnexConfig;
module.exports.getNodeEnvSpecificDefaults = getNodeEnvSpecificDefaults;
module.exports.getConfigEntry = getConfigEntry;
