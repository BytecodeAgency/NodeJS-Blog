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

const env = getEnv();
setEnv(env);
