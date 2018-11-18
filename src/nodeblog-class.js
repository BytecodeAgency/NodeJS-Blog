// TODO: Make this work and stuff

const getKnexInstance = require('knex');
const { generateKnexConfig } = require('../helpers');

class NodeBlog {
    constructor(client, host, database, user, password, debug) {
        this.client = client;
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.debug = debug;
        this.knexConfig = { client, host, database, user, password, debug }; // eslint-disable-line
        this.knex = getKnexInstance(generateKnexConfig);
        this.knex.migrate.latest(); // TODO: Clean up
    }
}

module.exports = NodeBlog;
