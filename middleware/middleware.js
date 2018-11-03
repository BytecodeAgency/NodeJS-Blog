const morgan = require('./modules/morgan');
const helmet = require('./modules/helmet');
const responseTimeHeader = require('./modules/response-time-header');

const register = app => {
    morgan(app);
    helmet(app);
    responseTimeHeader(app);
};

module.exports = register;
