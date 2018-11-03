/* eslint-disable no-console */

const chalk = require('chalk');

const logLevel = process.env.LOG_LEVEL;

const log = message => {
    console.log(message);
};

const dev = message => {
    if (logLevel >= 4) {
        console.log(`${chalk.hex('#35f241')('DEV')}: ${message}`);
    }
};

const debug = message => {
    if (logLevel >= 3) {
        console.log(`${chalk.hex('#f714ff')('DEBUG')}: ${message}`);
    }
};

const info = message => {
    if (logLevel >= 2) {
        console.log(`${chalk.hex('#146eff')('INFO')}: ${message}`);
    }
};

const warning = message => {
    if (logLevel >= 1) {
        console.log(`${chalk.yellow.bold('WARNING')}: ${message}`);
    }
};

const error = message => {
    if (logLevel >= 0) {
        console.log(`${chalk.red.bold('ERROR')}: ${message}`);
    }
};

module.exports = {
    log,
    dev,
    debug,
    info,
    warning,
    error,
};
