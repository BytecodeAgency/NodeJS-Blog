const express = require('express');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();
middleware.register(app);
app.use('/', routes);

module.exports = app;
