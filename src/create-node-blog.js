/* eslint-disable object-curly-newline */ // TODO: Write docs!!!!!!

const getKnexInstance = require('knex');
const generateKnexfile = require('../database/generate-knexfile');

const { Authors, Auth, Users, Articles } = require('../controllers');

const authors = {
    list: Authors.listAuthors,
    get: Authors.getAuthor,
    add: Authors.addAuthor,
    modify: Authors.modifyAuthor,
    delete: Authors.deleteAuthor,
};

const auth = {
    authenticate: Auth.authenticateUser,
    validate: Auth.validateToken,
};

const users = {
    list: Users.listUsers,
    get: Users.listUsers,
    add: Users.addUser,
    modify: Users.modifyUser,
    delete: Users.deleteUser,
};

const articles = {
    list: Articles.listArticles,
    get: Articles.getArticle,
    add: Articles.addArticle,
    // Modify is not yet available
    delete: Articles.deleteArticle,
};

// eslint-disable-next-line max-len, prettier/prettier
const createNodeBlogInstance = (client, host, database, user, password, debug) => {
    const knexConfig = { client, host, database, user, password, debug };
    const knexfile = generateKnexfile(knexConfig);
    const knex = getKnexInstance(knexfile);
    knex.migrate.latest();
    return knex;
};

module.exports = createNodeBlogInstance;
module.exports.authors = authors;
module.exports.auth = auth;
module.exports.users = users;
module.exports.articles = articles;
