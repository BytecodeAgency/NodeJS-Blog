const { knex } = require('../helpers');

const listArticles = async () => {
    const fields = [
        'articles.id',
        'articles.title',
        'articles.subtitle',
        'articles.slug',
        'articles.posted_on',
        'article_content.image_url AS article_image_url',
        'article_content.summary',
        'article_content.html_content',
        'authors.name as author_name',
        'authors.role as author_role',
        'authors.image_url AS author_image_url',
        'categories.name AS category_name',
        'categories.slug as category_slug',
    ];
    const articles = await knex
        .select(fields)
        .from('articles') // eslint-disable-next-line
        .join('article_content', 'article_content.article_id', '=', 'articles.id')
        .join('categories', 'categories.id', '=', 'articles.category')
        .join('authors', 'authors.id', '=', 'articles.author')
        .where('articles.hidden', '=', false)
        .andWhere('articles.posted_on', '<=', knex.raw('now()'));
    return articles;
};

const getRelatedArticles = async id => {};

const getArticle = async id => {
    const user = await knex
        .select('*')
        .from('users')
        .where({ id });
    return user[0];
};

const addArticle = async user => {

};

const modifyArticles = async (id, user) => {

};

const deleteArticle = async id =>
    new Promise(resolve =>
        knex('users')
            .returning(['id'])
            .where({ id })
            .delete()
            .then(data => resolve(data[0])),
        ); // eslint-disable-line

module.exports = {
    listArticles,
    getRelatedArticles,
    getArticle,
    addArticle,
    modifyArticles,
    deleteArticle,
};
