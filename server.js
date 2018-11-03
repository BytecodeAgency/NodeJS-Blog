/* eslint-disable */
require('dotenv').config();
const { NODE_ENV, PORT, ENABLE_SQREEN } = process.env;
if (ENABLE_SQREEN === 'true' && NODE_ENV !== 'test') require('sqreen');
/* eslint-enable */

const app = require('./app');
const logger = require('./helpers/logger');

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`); // eslint-disable-line
});
