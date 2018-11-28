/* eslint max-len: ["error", { "code": 100 }] */
/* eslint-disable prettier/prettier */

const { knex } = require('../helpers');

const fieldsBase = [
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

const calculateReadingTime = text => {
    try {
        const wordsPerMinute = 275;
        const wordArr = text.split(' ');
        const textWordAmount = wordArr.length;
        const readingTimeInMinutes = Math.floor(textWordAmount / wordsPerMinute);
        return readingTimeInMinutes;
    } catch (err) {
        return null;
    }
};

const addReadingTimeToArticles = articles => {
    const articlesWithReadingTime = articles.map(article => {
        const articleContent = article.html_content;
        const readingTime = calculateReadingTime(articleContent);
        const readingTimeObject = { reading_time: readingTime };
        const updatedArticle = Object.assign({}, article, readingTimeObject);
        return updatedArticle;
    });
    return articlesWithReadingTime;
};

const listArticles = async () => {
    const fields = [
        ...fieldsBase,
        'article_content.html_content',
    ];
    const articles = await knex
        .select(fields)
        .from('articles')
        .join('article_content', 'article_content.article_id', '=', 'articles.id')
        .join('categories', 'categories.id', '=', 'articles.category')
        .join('authors', 'authors.id', '=', 'articles.author')
        .where('articles.hidden', '=', false)
        .andWhere('articles.posted_on', '<=', knex.raw('now()'));
    const articlesWithReadingTime = addReadingTimeToArticles(articles);
    return articlesWithReadingTime;
};

const getRelatedArticles = async id => {
    const fields = [
        ...fieldsBase,
        'article_content.html_content',
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
    const articlesWithReadingTime = addReadingTimeToArticles(relatedArticles);
    return articlesWithReadingTime;
};

const getRelatedArticlesToArticleObject = async (id, article) => {
    const relatedArticles = await getRelatedArticles(id);
    const articleWithRelatedArticles = {
        ...article,
        related_articles: relatedArticles,
    };
    return articleWithRelatedArticles;
};

const getArticle = async id => {
    const fields = [
        ...fieldsBase,
        'article_content.html_content',
    ];
    const articles = await knex
        .select(fields)
        .from('articles') // eslint-disable-next-line
        .join('article_content', 'article_content.article_id', '=', 'articles.id')
        .join('categories', 'categories.id', '=', 'articles.category')
        .join('authors', 'authors.id', '=', 'articles.author')
        .where('articles.id', '=', id);
    const articlesWithReadingTime = addReadingTimeToArticles(articles);
    const articleBase = articlesWithReadingTime[0];
    const article = await getRelatedArticlesToArticleObject(id, articleBase);
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
    getRelatedArticlesToArticleObject,
    calculateReadingTime,
    addReadingTimeToArticles,
    getArticle,
    addArticle,
    modifyArticles,
    deleteArticle,
};
