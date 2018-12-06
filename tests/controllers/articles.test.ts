import { useTestDatabase } from '../config/index';
import blog from '../config/blog';

const {
    listArticles,
    getRelatedArticles,
    addRelatedArticlesToArticleObject,
    calculateReadingTime,
    addReadingTimeToArticles,
    getArticle,
    generateRelatedArticles,
    addToRelatedArticlesTable,
    addArticle,
    modifyArticle,
    deleteArticle,
} = require('../../controllers/articles');

useTestDatabase();

const newArticle = {
    title: 'newtitle',
    subtitle: 'newsubtitle',
    slug: 'new-title',
    image_url: 'http://placekitten.com/400/400',
    summary: 'the summary',
    html_content: 'the content',
    author: 2,
    category: 1,
    related_articles: [1, 2],
};

describe('Articles Controller', () => {
    test('listArticles should return articles array', async () => {
        expect.assertions(1);
        const articles = await listArticles(blog);
        expect(articles.length).toBeGreaterThan(0);
    });

    test('listArticles articles should include reading time', async () => {
        expect.assertions(1);
        const articles = await listArticles(blog);
        expect(typeof articles[0].reading_time).toBe('number');
    });

    test('addReadingTimeToArticles should add reading time', async () => {
        expect.assertions(1);
        let testString = '';
        for (let i = 0; i < 2750; i += 1) {
            testString += 'word ';
        }
        const testInput = [{ html_content: testString }];
        const expectedOutput = [{ html_content: testString, reading_time: 10 }];
        const receivedArticles = addReadingTimeToArticles(testInput);
        expect(receivedArticles).toEqual(expectedOutput);
    });

    test('listArticles should not list hidden articles', async () => {
        expect.assertions(2);
        const hidden = { hidden: true };
        const newHiddenArticle = { ...newArticle, ...hidden };
        const createdArticle = await addArticle(blog, newHiddenArticle);
        const articles = await listArticles(blog);
        const articlesWithNewArticleId = await articles.filter(article => {
            return article.id === createdArticle.id;
        });
        expect(await getArticle(blog, createdArticle.id)).toBeDefined();
        expect(articlesWithNewArticleId.length).toBe(0);
    });

    test('listArticles should not list articles from the future', async () => {
        expect.assertions(2);
        const date = new Date();
        const futureDays = date.setDate(date.getDate() + 100);
        const future = { posted_on: new Date(futureDays) };
        const futureArticle = { ...newArticle, ...future };
        const createdArticle = await addArticle(blog, futureArticle);
        const articles = await listArticles(blog);
        const articlesWithNewArticleId = await articles.filter(article => {
            return article.id === createdArticle.id;
        });
        expect(await getArticle(blog, createdArticle.id)).toBeDefined();
        expect(articlesWithNewArticleId.length).toBe(0);
    });

    test('getArticle should return an article with content', async () => {
        expect.assertions(14);
        const article = await getArticle(blog, 1);
        expect(typeof article.id).toBe('number');
        expect(typeof article.title).toBe('string');
        expect(typeof article.subtitle).toBe('string');
        expect(typeof article.slug).toBe('string');
        expect(article.posted_on).toBeInstanceOf(Date);
        expect(typeof article.article_image_url).toBe('string');
        expect(typeof article.summary).toBe('string');
        expect(typeof article.html_content).toBe('string');
        expect(typeof article.author_name).toBe('string');
        expect(typeof article.author_role).toBe('string');
        expect(typeof article.author_image_url).toBe('string');
        expect(typeof article.category_name).toBe('string');
        expect(typeof article.category_slug).toBe('string');
        expect(typeof article.reading_time).toBe('number');
    });

    test('calculateReadingTime should calculate reading time', async () => {
        const wordsPerMinute = 275;
        let testString = '';
        for (let i = 0; i < 2750; i += 1) {
            testString += 'word ';
        }
        const calculatedReadingTime = calculateReadingTime(testString);
        expect(calculatedReadingTime).toBe(10);
    });

    test('calculateReadingTime should round down', async () => {
        const wordsPerMinute = 275;
        let testString = '';
        for (let i = 0; i < 2760; i += 1) {
            testString += 'word ';
        }
        const calculatedReadingTime = calculateReadingTime(testString);
        expect(calculatedReadingTime).toBe(10);
    });

    test('calculateReadingTime should round down', async () => {
        const wordsPerMinute = 275;
        let testString = '';
        for (let i = 0; i < 2740; i += 1) {
            testString += 'word ';
        }
        const calculatedReadingTime = calculateReadingTime(testString);
        expect(calculatedReadingTime).toBe(9);
    });

    test('getRelatedArticles should return an article array', async () => {
        expect.assertions(14);
        const relatedArticles = await getRelatedArticles(blog, 1);
        const article = relatedArticles[0];
        expect(typeof article.id).toBe('number');
        expect(typeof article.title).toBe('string');
        expect(typeof article.subtitle).toBe('string');
        expect(typeof article.slug).toBe('string');
        expect(article.posted_on).toBeInstanceOf(Date);
        expect(typeof article.article_image_url).toBe('string');
        expect(typeof article.summary).toBe('string');
        expect(typeof article.author_name).toBe('string');
        expect(typeof article.author_role).toBe('string');
        expect(typeof article.author_image_url).toBe('string');
        expect(typeof article.html_content).toBe('string');
        expect(typeof article.category_name).toBe('string');
        expect(typeof article.category_slug).toBe('string');
        expect(typeof article.reading_time).toBe('number');
    });

    test('generateRelatedArticles should create valid objects', () => {
        const testId = 1;
        const testRelatedIds = [2, 3, 4];
        const expectedResponse = [
            { article_id: 1, related_article_id: 2 },
            { article_id: 1, related_article_id: 3 },
            { article_id: 1, related_article_id: 4 },
        ];
        const response = generateRelatedArticles(testId, testRelatedIds);
        expect(response).toEqual(expectedResponse);
    });

    test('addToRelatedArticlesTable cant add empty array', async () => {
        expect.assertions(1);
        const emptyArray = [];
        const response = await addToRelatedArticlesTable(blog, 1, emptyArray);
        expect(response).toEqual(emptyArray);
    });

    test('addToRelatedArticlesTable works with undefined', async () => {
        expect.assertions(1);
        const emptyArray = [];
        const response = await addToRelatedArticlesTable(blog, 1);
        expect(response).toEqual(emptyArray);
    });

    test('addArticle should add an article correctly', async () => {
        expect.assertions(15);
        const addedArticle = await addArticle(blog, newArticle);
        expect(typeof addedArticle).toBe('object');
        expect(typeof addedArticle.id).toBe('number');
        expect(typeof addedArticle.title).toBe('string');
        expect(typeof addedArticle.subtitle).toBe('string');
        expect(typeof addedArticle.slug).toBe('string');
        expect(addedArticle.posted_on).toBeInstanceOf(Date);
        expect(typeof addedArticle.article_image_url).toBe('string');
        expect(typeof addedArticle.summary).toBe('string');
        expect(typeof addedArticle.author_name).toBe('string');
        expect(typeof addedArticle.author_role).toBe('string');
        expect(typeof addedArticle.author_image_url).toBe('string');
        expect(typeof addedArticle.html_content).toBe('string');
        expect(typeof addedArticle.category_name).toBe('string');
        expect(typeof addedArticle.category_slug).toBe('string');
        expect(typeof addedArticle.reading_time).toBe('number');
    });

    // test('addArticle should work with custom posted_on', async () => { TODO:
    // });

    // TODO: Fix
    xtest('modifyArticle should modify an article correctly', async () => {
        expect.assertions(9);
        await modifyArticle(blog, 1, newArticle);
        const modifiedArticle = await getArticle(1);
        expect(modifiedArticle.title).toBe(newArticle.title);
        expect(modifiedArticle.subtitle).toBe(newArticle.subtitle);
        expect(modifiedArticle.slug).toBe(newArticle.slug);
        expect(modifiedArticle.image_url).toBe(newArticle.image_url);
        expect(modifiedArticle.summary).toBe(newArticle.summary);
        expect(modifiedArticle.html_content).toBe(newArticle.html_content);
        expect(modifiedArticle.author).toBe(newArticle.author);
        expect(modifiedArticle.category).toBe(newArticle.category);
        expect(modifiedArticle.related_articles)
            .toBe(newArticle.related_articles);
    });

    // TODO: Fix
    xtest('modifyArticle should work with when partly updating', async () => {
        expect.assertions(9);
        const originalArticle = await getArticle(blog, 1);
        const newArticlePart = {
            title: 'updated title',
        };
        await modifyArticle(blog, 1, newArticlePart);
        const modifiedArticle = await getArticle(newArticlePart);
        expect(modifiedArticle.title).toBe(newArticlePart.title);
        expect(modifiedArticle.subtitle).toBe(originalArticle.subtitle);
        expect(modifiedArticle.slug).toBe(originalArticle.slug);
        expect(modifiedArticle.image_url).toBe(originalArticle.image_url);
        expect(modifiedArticle.summary).toBe(originalArticle.summary);
        expect(modifiedArticle.html_content).toBe(originalArticle.html_content);
        expect(modifiedArticle.author).toBe(originalArticle.author);
        expect(modifiedArticle.category).toBe(originalArticle.category);
        expect(modifiedArticle.related_articles)
            .toBe(originalArticle.related_articles);
    });

    test('deleteArticle should delete an article', async () => {
        expect.assertions(2);
        return deleteArticle(blog, 1)
            .then(data => expect(data.id).toBe(1))
            .then(async () =>
                expect(await getArticle(blog, 1)).toBeUndefined());
    });
});
