/* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 10 }] */
/* eslint-disable prettier/prettier, max-len, arrow-body-style */

const addSeoTags = table => {
    table.string('seo_title').notNullable();
    table.string('seo_description').notNullable();
    table.string('seo_tags').notNullable();
};

const removeSeoTags = table => {
    table.dropColumn('seo_title');
    table.dropColumn('seo_description');
    table.dropColumn('seo_tags');
};

module.exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.table('articles', table => addSeoTags(table)),
    ]);
};

module.exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.table('articles', table => removeSeoTags(table)),
    ]);
};
