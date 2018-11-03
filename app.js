/* eslint-disable */
require('dotenv').config();
const { NODE_ENV, PORT, ENABLE_SQREEN } = process.env;
if (ENABLE_SQREEN === 'true' && NODE_ENV !== 'test') require('sqreen');
/* eslint-enable */

const express = require('express');
const routes = require('./routes');
const middleware = require('./middleware');
const logger = require('./helpers/logger');

const app = express();
middleware.register(app);
app.use('/', routes);

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`); // eslint-disable-line
});
