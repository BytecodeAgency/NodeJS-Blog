/* eslint-disable */
require('dotenv').config();
// @ts-ignore
const { NODE_ENV, PORT, ENABLE_SQREEN } = process.env;
if (ENABLE_SQREEN === 'true' && NODE_ENV !== 'test') require('sqreen');
/* eslint-enable */

// @ts-ignore
const app = require('./app');
// @ts-ignore
const { logger } = require('../helpers');

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`); // eslint-disable-line
});
