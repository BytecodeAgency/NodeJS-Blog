import * as fs from 'fs';

const getEnvVarArray = () => {
    const envFile = fs.readFileSync('.env', 'utf-8');
    const envRows = envFile.split('\n');
    const envRowsWithoutComments = envRows
        .filter(row => row.split('')[0] !== '#')
        .filter(row => !row.includes('NODE_ENV'))
        .filter(row => row !== '');
    return envRowsWithoutComments;
};

const envVarArray = getEnvVarArray();

const envVarObjectArray = envVarArray.map(envVar => {
    const key = envVar.split('=')[0];
    const value = envVar.split('=')[1];
    const envVarObject = {};
    envVarObject[key] = value;
    return envVarObject;
});

const envVarAmount = envVarObjectArray.length;

describe('Custom environment variables via .env file', () => {
    test('The envVarAmount should be greater than 0', () => {
        expect(envVarAmount).toBeGreaterThan(0);
    });

    test('Environment variables should be loaded', () => {
        expect.assertions(envVarAmount);
        envVarObjectArray.forEach(envVar => {
            const envVarName = Object.keys(envVar)[0];
            const envVarValue = envVar[envVarName];
            expect(process.env[envVarName]).toBe(envVarValue);
        });
    });

    test('Environment variables should be all strings', () => {
        expect.assertions(envVarAmount);
        envVarObjectArray.forEach(envVar => {
            const envVarName = Object.keys(envVar)[0];
            const envVarValue = envVar[envVarName];
            expect(typeof process.env[envVarName]).toBe('string');
        });
    });

    test('Environment variables are not empty', () => {
        expect.assertions(envVarAmount);
        envVarObjectArray.forEach(envVar => {
            const envVarName = Object.keys(envVar)[0];
            const envVarValue = envVar[envVarName];
            const envVarLength = process.env[envVarName].split('').length;
            expect(envVarLength).toBeGreaterThan(0);
        });
    });
});
