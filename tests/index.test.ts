// const nodeBlog = require('../');
// const { authors, auth, users, articles } = require('../');
// const { Authors } = require('../controllers');

// const client = process.env.DB_CLIENT_TEST;
// const host = process.env.DB_HOST_TEST;
// const user = process.env.DB_USER_TEST;
// const database = process.env.DB_NAME_TEST;
// const password = process.env.DB_PASS_TEST;
// const debug = process.env.KNEX_DEBUG;

// const nodeBlogArguments = { client, host, user, database, password, debug };
// const blog = nodeBlog(client, host, user, database, password, debug);

// describe('NodeBlog NPM module', () => {
//     test('NodeBlog to create a knex instance', () => {
//         expect(typeof blog).toBe('function');
//     });
//     test('Blog authors should work', async () => {
//         expect.assertions(3);
//         expect(typeof await authors.list(blog)).toBe('array');
//         expect(await authors.list(blog)).toEqual(Authors.list(blog));
//         expect(typeof await authors.get(blog, 1)).toBe('object');
//     });
//     test('Blog users should work', async () => {
//         expect.assertions(2);
//         expect(typeof await users.list(blog)).toBe('array');
//         expect(typeof await users.get(blog, 1)).toBe('object');
//     });
//     test('Blog articles should work', async () => {
//         expect.assertions(2);
//         expect(typeof await articles.list(blog)).toBe('array');
//         expect(typeof await articles.get(blog, 1)).toBe('object');
//     });
// });
