const knex = require('../../helpers/database');

const rollbackMigrateAndFill = async () =>
    knex.migrate
        .rollback()
        .then(() => knex.migrate.latest().then(() => knex.seed.run()));

const prepareDatabase = done => {
    rollbackMigrateAndFill().then(() => done());
};

module.exports = prepareDatabase;
