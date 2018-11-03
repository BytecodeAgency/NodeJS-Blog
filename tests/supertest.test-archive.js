// Supertest has a bug that creates an open handle with Jest
// Until this has been resolved, this file will be archived for later use.

const request = require('supertest');
const app = require('../app');

describe('Test the status paths', () => {
    test('The GET / route should give status code 200', async () => {
        expect.assertions(1);
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('The GET /status route should give status code 200', async () => {
        expect.assertions(1);
        const response = await request(app).get('/status');
        expect(response.statusCode).toBe(200);
    });
});
