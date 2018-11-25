/* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 10 }] */
/* eslint-disable prettier/prettier, max-len, arrow-body-style */

const createAuthorsTable = table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('image_url').notNullable();
    table.string('role').notNullable();
};

const createUsersTable = table => {
    table.increments('id');
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
    table.integer('author_id').references('id').inTable('authors');
};

const createCategoriesTable = table => {
    table.increments('id');
    table.string('name');
    table.string('slug');
};

const createArticlesTable = (table, knex) => {
    table.increments('id');
    table.integer('author').notNullable();
    table.string('title').notNullable();
    table.string('subtitle').notNullable();
    table.string('slug').notNullable().unique();
    table.integer('category').notNullable();
    table.date('posted_on').defaultTo(knex.fn.now());
    table.boolean('hidden').defaultTo(false);
};

const createArticleContentTable = table => {
    table.integer('article_id').notNullable().unique().references('id').inTable('articles');
    table.string('summary').notNullable();
    table.string('image_url').notNullable();
    table.text('html_content').notNullable();
};

const createRelatedArticlesTable = table => {
    table.integer('article_id').notNullable().references('id').inTable('articles');
    table.integer('related_article_id').notNullable().references('id').inTable('articles');
};

module.exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTable('users', table => createUsersTable(table)),
        knex.schema.createTable('authors', table => createAuthorsTable(table)),
        knex.schema.createTable('categories', table => createCategoriesTable(table)),
        knex.schema.createTable('articles', table => createArticlesTable(table, knex)),
        knex.schema.createTable('article_content', table => createArticleContentTable(table)),
        knex.schema.createTable('related_articles', table => createRelatedArticlesTable(table)),
    ]);
};

module.exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTable('related_articles'),
        knex.schema.dropTable('article_content'),
        knex.schema.dropTable('articles'),
        knex.schema.dropTable('categories'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('authors'),
    ]);
};
