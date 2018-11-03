const morgan = require('morgan');

module.exports = app => {
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
};
