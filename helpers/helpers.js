/* eslint-disable global-require */

module.exports = {
    knex: require('./database'),
    logger: require('./logger'),
    generateKnexConfig: require('./generate-knex-config'),
};
