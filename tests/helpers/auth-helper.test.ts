const { authHelper } = require('../../helpers');

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
});
