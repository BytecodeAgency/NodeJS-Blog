const morgan = require('morgan');

module.exports = app => {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        app.use(morgan('dev'));
    }
};
