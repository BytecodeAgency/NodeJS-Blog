/* tslint:disable: no-console */

import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';

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

const promptHandler = async () => {
    const answer = await prompt([question]) as any; // Hack to avoid error...
    if (answer.action === 'Add post') {
        addPost();
    }
};

const cli = async () => {
    intro();
    await promptHandler();
};

cli();
