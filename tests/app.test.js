const knex = require('../helpers/database');
const databaseSetup = require('./config/database-setup');

beforeEach(() => databaseSetup());

describe('Test if test database is configured correctly', () => {
    test('Jest should create a test database', async () => {
        expect.assertions(1);
        const data = await knex.select().table('authors');
        expect(data.length).toBeGreaterThan(0);
    });
});
