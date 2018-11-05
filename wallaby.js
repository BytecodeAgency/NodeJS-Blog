const fs = require('fs');

const getEnv = () => {
    const envFile = fs.readFileSync('.env', 'utf-8');
    const envRows = envFile.split('\n');
    const envRowsWithoutComments = envRows
        .filter(row => row.split('')[0] !== '#')
        .filter(row => !row.includes('NODE_ENV'))
        .filter(row => row !== '');
    return envRowsWithoutComments;
};

const setEnv = envVars => {
    envVars.forEach(envVar => {
        const param = envVar.split('=')[0];
        const value = envVar.split('=')[1];
        process.env[param] = value;
    });
};

const getConfig = wallaby => { // eslint-disable-line
    process.env.NODE_ENV = 'TEST';
    const env = getEnv();
    setEnv(env);

    return {
        files: [
            'server.js',
            'app.js',
            'knexfile.js',
            'knexfile-test.js',
            'controllers/**/*.js',
            'helpers/**/*.js',
            'middleware/**/*.js',
            'routes/**/*.js',
            'migrations/**/*.js',
            'seeds/**/*.js',
            'tests/config/**/*.js',
        ],
        tests: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
        env: {
            type: 'node',
            runner: 'node',
        },
        testFramework: 'jest',
        // debug: true,
        workers: {
            initial: 1,
            regular: 1,
            // restart: true,
        },
    };
};

module.exports = getConfig();
