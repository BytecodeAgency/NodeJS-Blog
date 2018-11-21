/* eslint-disable function-paren-newline */

const generateKnexConfig = require('../database/generate-knexfile');
const {
    getNodeEnvSpecificDefaults,
    getConfigEntry,
} = require('../database/generate-knexfile');

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

const KNEX_DEBUG_BOOL = KNEX_DEBUG === 'true';

const testNodeBlogConfig = {
    client: 'testclient',
    host: 'testhost',
    database: 'testhost',
    user: 'testuser',
    password: 'testpass',
    debug: true,
};

describe('Knexfile generator', () => {
    const defaultKnexConfig = generateKnexConfig();
    const testKnexConfig = generateKnexConfig(testNodeBlogConfig);

    test('Jest should run under "test" node_env (knexfile generator)', () => {
        expect(NODE_ENV).toBe('test');
    });

    test('If no config is given, fall back on env variables', () => {
        expect(defaultKnexConfig.client).toBe(DB_CLIENT_TEST);
        expect(defaultKnexConfig.connection.host).toBe(DB_HOST_TEST);
        expect(defaultKnexConfig.connection.database).toBe(DB_NAME_TEST);
        expect(defaultKnexConfig.connection.user).toBe(DB_USER_TEST);
        expect(defaultKnexConfig.connection.password).toBe(DB_PASS_TEST);
        expect(defaultKnexConfig.debug).toBe(KNEX_DEBUG_BOOL);
        expect(defaultKnexConfig.asyncStackTraces).toBe(KNEX_DEBUG_BOOL);
    });

    test('Debug should be turned off by default', () => {
        expect(defaultKnexConfig.debug).toBe(false);
        expect(defaultKnexConfig.asyncStackTraces).toBe(false);
    });

    test('If a config is given, it should be loaded and returned', () => {
        expect(testKnexConfig.client).toBe(testNodeBlogConfig.client);
        expect(testKnexConfig.connection.host).toBe(testNodeBlogConfig.host);
        expect(testKnexConfig.connection.database).toBe(
            testNodeBlogConfig.database,
        );
        expect(testKnexConfig.connection.user).toBe(testNodeBlogConfig.user);
        expect(testKnexConfig.connection.password).toBe(
            testNodeBlogConfig.password,
        );
        expect(testKnexConfig.debug).toBe(testNodeBlogConfig.debug);
        expect(testKnexConfig.asyncStackTraces).toBe(testNodeBlogConfig.debug);
    });

    test('Knexfile defaults should be set based on NODE_ENV', () => {
        const developmentDefaults = getNodeEnvSpecificDefaults('development');
        const testDefaults = getNodeEnvSpecificDefaults('test');
        const productionDefaults = getNodeEnvSpecificDefaults('production');
        expect(developmentDefaults).not.toEqual(testDefaults);
        expect(developmentDefaults).toEqual(productionDefaults);
        expect(developmentDefaults.client).toBe(DB_CLIENT);
        expect(testDefaults.client).toBe(DB_CLIENT_TEST);
        expect(developmentDefaults.host).toBe(DB_HOST);
        expect(developmentDefaults.database).toBe(DB_NAME);
        expect(developmentDefaults.user).toBe(DB_USER);
        expect(developmentDefaults.password).toBe(DB_PASS);
    });

    test('Config entries should return value, otherwise default', () => {
        const testValue = 'givenvalue';
        const configWithValueGiven = getConfigEntry('client', testValue);
        const configWithoutValueGiven = getConfigEntry('client');
        expect(configWithValueGiven).toBe(testValue);
        expect(configWithoutValueGiven).toBe(process.env.DB_CLIENT_TEST);
    });
});
