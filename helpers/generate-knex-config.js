const generateKnexConfig = (client, host, database, user, password, debug) => {
    const config = {
        client,
        connection: {
            host,
            database,
            user,
            password,
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

    return config;
};

module.exports = generateKnexConfig;
