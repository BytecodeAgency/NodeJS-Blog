/* tslint:disable: no-console import-name */

/**
 * TODO: Test this and split up
 * We know the rules. Don't write production code if there are no failing tests
 * for the code you're about to write. Any code you write that has no unit tests
 * should be seen as legacy code. Yes, we get it. This CLI tool should indeed be
 * tested, but due to time concerns we chose to set this up quick and easy.
 * Besides, we would like to split this up into a separate module soon.
 */

import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import knexGenerator from 'knex';

import generateKnexfile = require('../database/generate-knexfile');
import addPost from './add-post';

const prompt = inquirer.createPromptModule();
const choices = ['Add post'];
const question = {
    choices,
    name: 'action',
    type: 'list',
    message: 'Please select the action you wish to perform',
};

const intro = () => {
    console.clear();
    console.log(
        chalk.yellow(
            figlet.textSync('NodeJS Blog', { horizontalLayout: 'full' })));
};

const promptHandler = async knex => {
    const answer = await prompt([question]) as any; // Hack to avoid error...
    if (answer.action === 'Add post') {
        addPost(knex);
    }
};

const createKnexInstance = config => {
    const knexfile = generateKnexfile(config);
    const knex = knexGenerator(knexfile);
    return knex;
};

const cli = async (
    client = process.env.DB_CLIENT_TEST,
    host = process.env.DB_HOST_TEST,
    user = process.env.DB_USER_TEST,
    database = process.env.DB_NAME_TEST,
    password = process.env.DB_PASS_TEST,
    debug = process.env.KNEX_DEBUG === 'true',
) => {
    intro();

    try {
        // TODO: Load the config using a promt
        const config = { client, host, user, database, password, debug };
        const knex = createKnexInstance(config);
        await promptHandler(knex);
    } catch (err) {
        console.log(`${chalk.red('Error')}: the CLI failed you :(`);
        console.log(err);
    }
};

// Run CLI
require('dotenv').config(); // Load .env file
cli();
