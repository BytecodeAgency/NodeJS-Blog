/* eslint max-len: ["error", { "code": 100 }] */
/* eslint-disable prettier/prettier */

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
        .from('articles')
        .join('article_content', 'article_content.article_id', '=', 'articles.id')
        .join('categories', 'categories.id', '=', 'articles.category')
        .join('authors', 'authors.id', '=', 'articles.author')
        .where('articles.hidden', '=', false)
        .andWhere('articles.posted_on', '<=', knex.raw('now()'));
    return articles;
};

const getRelatedArticles = async id => {
    const fields = [
        'articles.id',
        'articles.title',
        'articles.subtitle',
        'articles.slug',
        'articles.posted_on',
        'article_content.image_url AS article_image_url',
        'article_content.summary',
        'authors.name AS author_name',
        'authors.role AS author_role',
        'authors.image_url AS author_image_url',
        'categories.name AS category_name',
        'categories.slug AS category_slug',
    ];
    const relatedArticles = await knex
        .select(fields)
        .from('articles')
        .join('article_content', 'article_content.article_id', '=', 'articles.id')
        .join('categories', 'categories.id', '=', 'articles.category')
        .join('authors', 'authors.id', '=', 'articles.author')
        .join('related_articles', 'related_articles.related_article_id', '=', 'articles.id')
        .where('related_articles.article_id', '=', id)
        .andWhere('articles.hidden', '=', false)
        .andWhere('articles.posted_on', '<=', knex.raw('now()'));
    return relatedArticles;
};

const addRelatedArticles = async (id, article) => {
    const relatedArticles = await getRelatedArticles(id);
    const articleWithRelatedArticles = {
        ...article,
        related_articles: relatedArticles,
    };
    return articleWithRelatedArticles;
};

const getArticle = async id => {
    const fields = [
        'articles.id',
        'articles.title',
        'articles.subtitle',
        'articles.slug',
        'articles.posted_on',
        'article_content.image_url AS article_image_url',
        'article_content.summary',
        'article_content.html_content',
        'authors.name AS author_name',
        'authors.role AS author_role',
        'authors.image_url AS author_image_url',
        'categories.name AS category_name',
        'categories.slug AS category_slug',
    ];
    const articles = await knex
        .select(fields)
        .from('articles') // eslint-disable-next-line
        .join('article_content', 'article_content.article_id', '=', 'articles.id')
        .join('categories', 'categories.id', '=', 'articles.category')
        .join('authors', 'authors.id', '=', 'articles.author')
        .where('articles.id', '=', id);
    const articleBase = articles[0];
    const article = await addRelatedArticles(id, articleBase);
    return article;
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
