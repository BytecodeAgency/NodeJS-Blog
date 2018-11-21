const { knex } = require('../../helpers');

const rollbackMigrateAndFill = async () =>
    knex.migrate
        .rollback()
        .then(() => knex.migrate.latest().then(() => knex.seed.run()));

const prepareDatabase = done => {
    rollbackMigrateAndFill().then(() => done());
};

const useTestDatabase = () => {
    beforeEach(done => prepareDatabase(done));
    afterAll(() => knex.destroy());
};

export default useTestDatabase;
