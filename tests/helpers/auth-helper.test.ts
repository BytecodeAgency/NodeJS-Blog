const { authHelper } = require('../../helpers');

const { JWT_SECRET, JWT_EXPIRES_IN_DAYS } = process.env;

const testPassword = 'the_test_password';
const getPasswordHash = async () =>
    authHelper.generatePasswordHash(testPassword);

describe('Authentication helper', () => {
    test('generatePasswordHash should not return the password', async () => {
        expect.assertions(1);
        const testPasswordHash = await getPasswordHash();
        expect(testPasswordHash).not.toBe(testPassword);
    });

    test('generatePasswordHash should return a string', async () => {
        expect.assertions(1);
        const testPasswordHash = await getPasswordHash();
        expect(typeof testPasswordHash).toBe('string');
    });

    test('generatePasswordHash should generate a valid hash', async () => {
        expect.assertions(1);
        const testPasswordHash = await getPasswordHash();
        const passwordCheck = await authHelper.checkPasswordHash(testPassword, testPasswordHash);
        expect(passwordCheck).toBe(true);
    });

    test('generateJWT should return a string', () => {
        const payloadData = {
            user: 'Test',
        };
        const authToken = authHelper.generateJWT(payloadData);
        expect(typeof authToken).toBe('string');
    });

    test('decodeJWT should return the correct payload', () => {
        const payloadData = {
            user: 'Test',
        };
        const payload = authHelper.generatePayload(payloadData);
        const authToken = authHelper.generateJWT(payloadData);
        const decodedPayload = authHelper.decodeJWT(authToken);
        expect(decodedPayload).toEqual(payload);
    });

    test('JWT expiry data create a valid date object', () => {
        const payload = {
            user: 'Test',
        };
        const authToken = authHelper.generateJWT(payload);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadDate = new Date(decodedPayload.expires);
        expect(payloadDate).toBeInstanceOf(Date);
    });

    test('JWT expiry date should be in the future', () => {
        const payload = {
            user: 'Test',
        };
        const authToken = authHelper.generateJWT(payload);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadDate = decodedPayload.expires;
        expect(payloadDate).toBeGreaterThan(Date.now());
    });

    test('JWT should expire in JWT_EXPIRES_IN_DAYS days', () => {
        const payload = {
            user: 'Test',
        };
        const authToken = authHelper.generateJWT(payload);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadDate = decodedPayload.expires;
        const expectedExpiryDate = authHelper.calculateExpiryDate();

        // Precise to 10 seconds TODO: Test this better
        expect(Math.floor(payloadDate / 10)).toBe(Math.floor(expectedExpiryDate / 10));
    });
});
