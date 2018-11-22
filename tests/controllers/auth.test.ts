import { useTestDatabase } from '../config/index';

const { getUserByUsername, generateToken } = require('../../controllers/auth');
const { addUser } = require('../../controllers/users');

const testUser = {
    username: 'authtestuser',
    email: 'authtestuser@domain.com',
    first_name: 'Test',
    last_name: 'Doe',
    password: 'thetestpassword',
};

const testUser2 = {
    username: 'authtestuser2',
    email: 'authtestuser2@domain.com',
    first_name: 'Test2',
    last_name: 'Doe2',
    password: 'thetestpassword2',
};

useTestDatabase();

beforeEach(async () => await addUser(testUser));

describe('Auth Controller', () => {
    test('getUserByUsername should return user if it exists', async () => {
        expect.assertions(3);
        const addedUser = await addUser(testUser2);
        const expectedId = addedUser.id;
        const { username, email, password } = testUser2;
        const fetchedUser = await getUserByUsername(username);
        expect(fetchedUser.username).toBe(username);
        expect(fetchedUser.email).toBe(email);
        expect(fetchedUser.password).not.toBe(password);
    });

    // test('generateToken should throw error on incorrect pass', () => {
    //     const { username, password } = testUser;
    //     expect(() => generateToken(username, password))
    //         .toThrowError('Incorrect credentials');
    // });
});
