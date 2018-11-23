import * as jwt from 'jwt-simple';

const { authHelper } = require('../../helpers');

const { JWT_EXPIRES_IN_DAYS } = process.env;

const decimalRadix = 10;
const jwtExpiresInDays = parseInt(JWT_EXPIRES_IN_DAYS || '7', decimalRadix);

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
        const passwordCheck =
            await authHelper.checkPasswordHash(testPassword, testPasswordHash);
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
        expect(decodedPayload.data).toEqual(payloadData);
    });

    test('JWT dates create a valid date object', () => {
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
        const payloadIssuedAtDate = decodedPayload.iat;

        // Precise to 1 second TODO: Test this better
        const issuedDate = Math.round(payloadIssuedAtDate / 1000);
        const nowDate = Math.round(Date.now() / 1000);
        expect(issuedDate).toBe(nowDate);
    });

    test('JWT issued at date should be now', () => {
        const payload = {
            user: 'Test',
        };
        const authToken = authHelper.generateJWT(payload);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadIssuedAt = decodedPayload.iat;

        // Precise to 1 second TODO: Test this better
        const payloadIAT = Math.round(payloadIssuedAt / 1000);
        const expectedIAT = Math.round(Date.now() / 1000);
        expect(payloadIAT).toBe(expectedIAT);
    });

    test('JWT should expire in JWT_EXPIRES_IN_DAYS days', () => {
        const payload = {
            user: 'Test',
        };
        const authToken = authHelper.generateJWT(payload);
        const decodedPayload = authHelper.decodeJWT(authToken);
        const payloadIssuedAtDate = decodedPayload.iat;
        const payloadExpiryDate = decodedPayload.exp;
        const calculatedDays = authHelper.calculateDates();

        // Precise to 1 second TODO: Test this better
        const payloadIAT = Math.round(payloadIssuedAtDate / 1000);
        const expectedIAT = Math.round(calculatedDays.iat / 1000);
        const payloadEXP = Math.round(payloadExpiryDate / 1000);
        const expectedEXP = Math.round(calculatedDays.exp / 1000);
        expect(payloadIAT).toBe(expectedIAT);
        expect(payloadEXP).toBe(expectedEXP);
    });

    test('decodeJWT should throw error if JWT is invalid', () => {
        const invalidJWT = jwt.encode({ data: 'invalid' }, 'invalid_secret');
        expect(() => authHelper.decodeJWT(invalidJWT)).toThrowError();
    });

    test('validateJWT should throw error if JWT is expired', () => {
        const payload = {
            user: 'Test',
        };
        const date = new Date();
        const issuedAt = date.setDate(date.getDate() - jwtExpiresInDays - 1);
        const expiredJWT = authHelper.generateJWT(payload, issuedAt);
        expect(() => authHelper.validateJWT(expiredJWT))
            .toThrowError('Token expired');
    });

    test('validateJWT should return data if JWT is valid, not expired', () => {
        const payloadData = {
            user: 'Test',
        };
        const validJWT = authHelper.generateJWT(payloadData);
        const expectedPayload = authHelper.generatePayload(payloadData);
        expect(authHelper.validateJWT(validJWT)).toEqual(expectedPayload);
    });
});
