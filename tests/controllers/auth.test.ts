import { useTestDatabase } from '../config/index';

const {
    getUserByUsername,
    generateToken,
    generateTokenPayload,
    authenticateUser,
    validateToken,
} = require('../../controllers/auth');
const { addUser } = require('../../controllers/users');
const { authHelper } = require('../../helpers');

const { JWT_EXPIRES_IN_DAYS } = process.env;
const decimalRadix = 10;
const jwtExpiresInDays = parseInt(JWT_EXPIRES_IN_DAYS || '7', decimalRadix);

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
        expect.assertions(4);
        const addedUser = await addUser(testUser2);
        const expectedId = addedUser.id;
        const { username, email, password } = testUser2;
        const fetchedUser = await getUserByUsername(username);
        expect(fetchedUser.id).toBe(expectedId);
        expect(fetchedUser.username).toBe(username);
        expect(fetchedUser.email).toBe(email);
        expect(fetchedUser.password).not.toBe(password);
    });

    test('authenticateUser should authenticate correctly', async () => {
        expect.assertions(2);
        const { username, password } = testUser;
        const incorrectPassword = 'incorrect_password';
        expect(await authenticateUser(username, password)).toBe(true);
        expect(await authenticateUser(username, incorrectPassword)).toBe(false);
    });

    test('generateToken should throw error on invalid login', async () => {
        expect.assertions(1);
        const { username } = testUser;
        const incorrectPassword = 'incorrect_password';
        await expect(generateToken(username, incorrectPassword))
            .rejects
            .toThrowError('Incorrect credentials');
    });

    test('generateTokenPayload should create a user object', async () => {
        expect.assertions(4);
        const { username } = testUser;
        const tokenPayload = await generateTokenPayload(username);
        expect(typeof tokenPayload).toBe('object');
        expect(typeof tokenPayload.id).toBe('number');
        expect(typeof tokenPayload.username).toBe('string');
        expect(typeof tokenPayload.email).toBe('string');
    });

    test('validateToken should fail if user doesnt exist', async () => {
        expect.assertions(1);
        const invalidPayloadData = {
            id: 1000,
            username: 'invaliduser',
            email: 'in@valid.com',
        };
        const invalidToken = authHelper.generateJWT(invalidPayloadData);
        const invalidTokenIsValid = await validateToken(invalidToken);
        expect(invalidTokenIsValid).toBe(false);
    });

    test('validateToken should fail if token has expired', async () => {
        expect.assertions(1);
        const addedUser = await addUser(testUser2);
        const { username } = addedUser;
        const tokenPayloadData = generateTokenPayload(username);
        const date = new Date();
        const issuedAt = date.setDate(date.getDate() - jwtExpiresInDays - 1);
        const expiredJWT = authHelper.generateJWT(tokenPayloadData, issuedAt);
        const invalidTokenIsValid = await validateToken(expiredJWT);
        expect(invalidTokenIsValid).toBe(false);
    });

    test('validateToken should pass if token is valid', async () => {
        expect.assertions(1);
        const { username } = testUser;
        const tokenPayloadData = await generateTokenPayload(username);
        const validToken = authHelper.generateJWT(tokenPayloadData);
        const validTokenIsValid = await validateToken(validToken);
        expect(validTokenIsValid).toBe(true);
    });

    test('generateToken should give valid tokens', async () => {
        expect.assertions(1);
        const { username, password } = testUser;
        const validToken = await generateToken(username, password);
        const validTokenIsValid = await validateToken(validToken);
        expect(validTokenIsValid).toBe(true);
    });
});
