const knex = require('../../helpers/database');

const rollbackMigrateAndFill = async () =>
    knex.migrate
        .rollback()
        .then(() => knex.migrate.latest().then(() => knex.seed.run()));

const prepareDatabase = async () => Promise.resolve(rollbackMigrateAndFill());

module.exports = prepareDatabase;
