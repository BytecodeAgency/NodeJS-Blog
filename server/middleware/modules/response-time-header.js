module.exports = app => {
    if (process.env.NODE_ENV === 'development') {
        const responseTime = require('response-time'); // eslint-disable-line
        app.use(responseTime());
    }
};
