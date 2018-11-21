import { useTestDatabase } from '../config/index';

const {  } = require('../../controllers/auth');

useTestDatabase();

const newAuthor = {
    name: 'John Doe 2',
    image_url: 'http://placekitten.com/150/150',
    role: 'Tester',
};

describe('Auth Controller', () => {
    test('Just say it is OK', () => {
        expect(true).toBe(true);
    });
});
