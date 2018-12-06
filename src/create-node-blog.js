/* eslint-disable object-curly-newline */

const getKnexInstance = require('knex');
const generateKnexfile = require('../database/generate-knexfile');
const { authHelper } = require('../helpers');

const {
    Authors,
    Auth,
    Users,
    Categories,
    Articles,
} = require('../controllers');

const authors = {
    list: Authors.listAuthors,
    get: Authors.getAuthor,
    add: Authors.addAuthor,
    modify: Authors.modifyAuthor,
    delete: Authors.deleteAuthor,
};

const auth = {
    generateToken: Auth.generateToken,
    authenticate: Auth.authenticateUser,
    decode: authHelper.decodeJWT,
    validate: Auth.validateToken,
};

const users = {
    list: Users.listUsers,
    get: Users.getUser,
    add: Users.addUser,
    modify: Users.modifyUser,
    delete: Users.deleteUser,
};

const categories = {
    list: Categories.listCategories,
    get: Categories.getCategory,
    add: Categories.addCategory,
    modify: Categories.modifyCategory,
    delete: Categories.deleteCategory,
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
module.exports.categories = categories;
module.exports.articles = articles;
