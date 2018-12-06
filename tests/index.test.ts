import { useTestDatabase } from './config/index';
import blog from './config/blog';

const nodeBlog = require('../');
const { authors, auth, users, categories, articles } = require('../');

const client = process.env.DB_CLIENT_TEST;
const host = process.env.DB_HOST_TEST;
const user = process.env.DB_USER_TEST;
const database = process.env.DB_NAME_TEST;
const password = process.env.DB_PASS_TEST;
const debug = process.env.KNEX_DEBUG === 'true';

const generatedBlog = nodeBlog(client, host, user, database, password, debug);

useTestDatabase();

describe('NodeBlog NPM module', () => {
    test('NodeBlog to create a knex instance', () => {
        expect(typeof generatedBlog).toBe('function');
    });
    test('Blog authors should work', async () => {
        expect.assertions(2);
        const list = await authors.list(blog);
        const getItem = await authors.get(blog, 1);
        expect(typeof list).toBe('object');
        expect(typeof getItem).toBe('object');
    });
    test('Blog users should work', async () => {
        expect.assertions(2);
        const list = await users.list(blog);
        const getItem = await users.get(blog, 1);
        expect(typeof list).toBe('object');
        expect(typeof getItem).toBe('object');
    });
    test('Blog categories should work', async () => {
        expect.assertions(2);
        const list = await categories.list(blog);
        const getItem = await categories.get(blog, 1);
        expect(typeof list).toBe('object');
        expect(typeof getItem).toBe('object');
    });
    test('Blog articles should work', async () => {
        expect.assertions(2);
        const list = await articles.list(blog);
        const getItem = await articles.get(blog, 1);
        expect(typeof list).toBe('object');
        expect(typeof getItem).toBe('object');
    });
    test('Add user should be working', async () => {
        expect.assertions(1);
        const newUser = {
            username: 'anewuser',
            email: 'anewuser@domain.com',
            first_name: 'Jane',
            last_name: 'Doe',
            password: 'theplainpasswordgoeshere',
            author_id: 2,
        };
        await users.add(blog, newUser);
        const isAuth =
            await auth.authenticate(blog, newUser.username, newUser.password);
        expect(isAuth).toBe(true);
    });
});
