import { useTestDatabase } from './config/index';
const { knex } = require('../helpers');

useTestDatabase();

describe('Test if test database is configured correctly', () => {
    test('Users table should be filled', async () => {
        expect.assertions(1);
        const data = await knex.select().table('users');
        expect(data.length).toBe(2);
    });

    test('Authors table should be filled', async () => {
        expect.assertions(1);
        const data = await knex.select().table('authors');
        expect(data.length).toBe(2);
    });

    test('Categories table should be filled', async () => {
        expect.assertions(1);
        const data = await knex.select().table('categories');
        expect(data.length).toBe(2);
    });

    test('Articles table should be filled', async () => {
        expect.assertions(1);
        const data = await knex.select().table('articles');
        expect(data.length).toBe(2);
    });

    test('Article Content table should be filled', async () => {
        expect.assertions(1);
        const data = await knex.select().table('article_content');
        expect(data.length).toBe(2);
    });

    test('Related Articles table should be filled', async () => {
        expect.assertions(1);
        const data = await knex.select().table('related_articles');
        expect(data.length).toBe(2);
    });
});
