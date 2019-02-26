/* eslint max-len: ["error", { "code": 100 }] */
/* eslint-disable prettier/prettier */

// const { knex } = require('../helpers');

const fieldsBase = [
    'articles.id',
    'articles.title',
    'articles.subtitle',
    'articles.slug',
    'articles.posted_on',
    'articles.seo_title',
    'articles.seo_description',
    'articles.seo_tags',
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

const listArticles = async knex => {
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

const getRelatedArticles = async (knex, id) => {
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

const addRelatedArticlesToArticleObject = async (knex, id, article) => {
    const relatedArticles = await getRelatedArticles(knex, id);
    if (relatedArticles.length === 0) {
        return article;
    }
    const articleWithRelatedArticles = {
        ...article,
        related_articles: relatedArticles,
    };
    return articleWithRelatedArticles;
};

const getArticle = async (knex, id) => {
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
    const article = await addRelatedArticlesToArticleObject(knex, id, articleBase);
    return article;
};

const addToArticlesTable = async (knex, articleData) => {
    const returning = ['id', 'title', 'subtitle', 'posted_on', 'slug', 'author', 'category'];
    const addedArticle = await knex('articles')
        .insert([articleData])
        .returning(returning);
    return addedArticle[0];
};

const addToArticleContentTable = async (knex, articleData) => {
    const returning = ['summary', 'image_url', 'html_content'];
    const addedArticle = await knex('article_content')
        .insert([articleData])
        .returning(returning);
    return addedArticle[0];
};

const generateRelatedArticles = (id, relatedArticles) => {
    const relatedArticlesObjects = relatedArticles.map(relatedArticle => {
        const relatedArticleObject = {
            article_id: id,
            related_article_id: relatedArticle,
        };
        return relatedArticleObject;
    });
    return relatedArticlesObjects;
};

const addToRelatedArticlesTable = async (knex, id, relatedArticles) => {
    if (!relatedArticles || relatedArticles.length === 0) {
        return [];
    }
    const relatedArticlesArray = generateRelatedArticles(id, relatedArticles);
    const addedRelatedArticles = await knex('related_articles')
        .insert(relatedArticlesArray)
        .returning('article_id', 'related_article_id');
    return addedRelatedArticles;
};

const addArticle = async (knex, article) => {
    const articleData = {
        title: article.title,
        subtitle: article.subtitle,
        posted_on: article.posted_on,
        hidden: article.hidden,
        slug: article.slug,
        author: article.author,
        category: article.author,
        seo_title: article.seo_title,
        seo_description: article.seo_description,
        seo_tags: article.seo_tags,
    };
    const addedArticleData = await addToArticlesTable(knex, articleData);
    const addedArticleId = addedArticleData.id;
    const articleContentData = {
        article_id: addedArticleId,
        summary: article.summary,
        image_url: article.image_url,
        html_content: article.html_content,
    };
    await addToArticleContentTable(knex, articleContentData);
    const relatedArticleIds = article.related_articles;
    await addToRelatedArticlesTable(knex, addedArticleId, relatedArticleIds);
    const createdArticle = await getArticle(knex, addedArticleId);
    return createdArticle;
};

// TODO: fix and test better
// eslint-disable-next-line
const modifyArticle = async (knex, id, article) => {
    throw new Error('Article modification is not supported');
};

const deleteArticle = async (knex, id) => {
    await knex('related_articles')
        .where({ article_id: id })
        .orWhere({ related_article_id: id })
        .delete();
    await knex('article_content')
        .where({ article_id: id })
        .delete();
    await knex('articles')
        .where({ id })
        .delete();
    return { id };
};

module.exports = {
    listArticles,
    getRelatedArticles,
    addRelatedArticlesToArticleObject,
    calculateReadingTime,
    addReadingTimeToArticles,
    addToRelatedArticlesTable,
    getArticle,
    generateRelatedArticles,
    addArticle,
    modifyArticle,
    deleteArticle,
};
