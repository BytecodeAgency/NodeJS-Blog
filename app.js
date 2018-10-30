/* eslint-disable */
const { NODE_ENV, PORT, ENABLE_SQREEN } = process.env;
require('dotenv').config();
if (ENABLE_SQREEN === 'true' && NODE_ENV !== 'test') require('sqreen');
/* eslint-enable */

console.log(PORT);
console.log(NODE_ENV);
