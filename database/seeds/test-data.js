/**
 * About this seed, this seed fills the database with:
 * - 2 authors
 * - 2 users
 * - 2 categories
 * - 2 articles
 * - article_contents for article with id 1+2
 * - related_articles for article with id 1+2, they link to each other
 */

const insertAuthors = knex =>
    knex('authors')
        .del()

        .then(() =>
            knex('authors').insert([
                {
                    name: 'John Doe',
                    image_url: 'http://placekitten.com/200/200',
                    role: 'Dummy',
                },
                {
                    name: 'John Doe',
                    image_url: 'http://placekitten.com/200/200',
                    role: 'Dummy',
                },
            ]),
        ); // eslint-disable-line

const insertUsers = knex =>
    knex('users')
        .del()
        .then(() =>
            knex('users').insert([
                {
                    username: 'admin',
                    email: 'admin@gmail.com',
                    first_name: 'Admin',
                    last_name: 'Istrator',
                    password: 'PasswordHashGoesHere',
                    author_id: 1,
                },
                {
                    username: 'admin2',
                    email: 'admin2@gmail.com',
                    first_name: 'Admin2',
                    last_name: 'Istrator2',
                    password: 'PasswordHash2GoesHere',
                },
            ]),
        ); // eslint-disable-line

const insertCategories = knex => {
    knex('categories')
        .del()
        .then(() =>
            knex('categories').insert([
                {
                    name: 'Category one',
                    slug: 'category-one',
                },
                {
                    name: 'Category two',
                    slug: 'category-two',
                },
            ]),
        ); // eslint-disable-line
};

const insertArticleContent = knex =>
    knex('article_content').insert([
        {
            article_id: 1,
            summary: 'In short',
            image_url: 'http://placekitten.com/500/500',
            html_content: 'In long',
        },
        {
            article_id: 2,
            summary: 'In short2',
            image_url: 'http://placekitten.com/500/500',
            html_content: 'In long2',
        },
    ]);

const insertArticles = knex =>
    knex('articles')
        .del()
        .then(() =>
            knex('articles')
                .returning('id')
                .insert([
                    {
                        author: 1,
                        title: 'Article 1',
                        subtitle: 'Subtitle Article 1',
                        slug: 'article_one',
                        category: 1,
                    },
                    {
                        author: 1,
                        title: 'Article 2',
                        subtitle: 'Subtitle Article 2',
                        slug: 'article_two',
                        category: 1,
                    },
                ]),
        ); // eslint-disable-line

const insertRelatedArticles = knex =>
    knex('related_articles')
        .del()
        .then(() =>
            knex('related_articles').insert([
                {
                    article_id: 1,
                    related_article_id: 2,
                },
                {
                    article_id: 2,
                    related_article_id: 1,
                },
            ]),
        ); // eslint-disable-line

const insertInOrder = knex =>
    insertAuthors(knex)
        .then(() => insertUsers(knex))
        .then(() => insertCategories(knex))
        .then(() => insertArticles(knex))
        .then(() => insertArticleContent(knex))
        .then(() => insertRelatedArticles(knex));

exports.seed = knex => insertInOrder(knex);
