module.exports = app => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        const responseTime = require('response-time'); // eslint-disable-line
        app.use(responseTime());
    }
};
