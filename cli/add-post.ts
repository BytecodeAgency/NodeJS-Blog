/* tslint:disable: no-console */

import chalk from 'chalk';
import inquirer from 'inquirer';
import articles = require('../controllers/articles');

const { addArticle, getArticle } = articles;

const prompt = inquirer.createPromptModule();

const addPostQuestions = [
    { type: 'input', name: 'title', message: 'What is the post title' },
    { type: 'input', name: 'subtitle', message: 'And the post subtitle' },
    { type: 'input', name: 'slug', message: 'And the post slug' },
    { type: 'input', name: 'author', message: 'What is the author id' },
    { type: 'input', name: 'category', message: 'What is the category id' },
    { type: 'input', name: 'summary', message: 'Please give a short summary' },
    { type: 'input', name: 'image_url', message: 'What is the image url' },
    { type: 'input', name: 'html_content', message: 'Minified HTML string' },
    { type: 'input', name: 'related_articles',
        message: 'Related articles, comma seperated, no spaces, ("1,2,3")' },
];

const createPostDataObject = input => {
    const relatedArticleString = input.related_articles;
    const relatedArticlesArray = relatedArticleString.split(',');
    const postData = { ...input, related_articles: relatedArticlesArray };
    return postData;
};

const addPost = async knex => {
    const postDataInputRaw = await prompt(addPostQuestions);
    const postDataInput = createPostDataObject(postDataInputRaw);
    try {
        const addedArticle = await addArticle(knex, postDataInput);
        console.log(`${chalk.green('Success')}: article added!`);
    } catch (err) {
        console.log(`${chalk.red('Error')}: the CLI failed you :(`);
        console.log(err);
    }
};

export default addPost;
