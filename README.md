# NodeJS Blog API [![Project maintainers](https://img.shields.io/badge/Project%20maintained%20by-Bytecode%20Digital%20Agency-brightgreen.svg)](https://bytecode.nl)

[![Build Status](https://travis-ci.org/lucianonooijen/NodeJS-Blog.svg?branch=master)](https://travis-ci.org/lucianonooijen/NodeJS-Blog)
[![codecov](https://codecov.io/gh/lucianonooijen/NodeJS-Blog/branch/master/graph/badge.svg)](https://codecov.io/gh/lucianonooijen/NodeJS-Blog)
[![npm version](https://badge.fury.io/js/nodejs-blog.svg)](https://badge.fury.io/js/nodejs-blog)
[![NodeJS Version](https://img.shields.io/badge/Node%20Version-%3E%3D%20v8.0.0-green.svg)](https://img.shields.io/badge/Node%20Version-%3E%3D%20v8.0.0-green.svg)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

Blog API developed by Bytecode Digital Agency as free (as in freedom) open source software. Built in NodeJS. Available as a standalone server, or as a NPM package

## Installation

To install the module, run

```sh
yarn add nodejs-api
```

or

```sh
npm install nodejs-api
```

For contributing to the development, fork the [GitHub repository](https://github.com/lucianonooijen/NodeJS-Blog).

## Configuration

*This part is not implemented in the code yet.*

To use the NodeJS Blog module, first, import the package

```js
const NodeBlog = require('nodejs-blog');
```

or using ES6 modules

```js
import NodeBlog from 'nodejs-blog';
```

to start using the package, create a new instance of the NodeBlog class

```js
const nodeBlogConfig = {
    client: 'YOUR_DB_CLIENT', // for more info, see https://knexjs.org/
    host: 'YOUR_DB_HOST',
    database: 'YOUR_DB_NAME',
    user: 'YOUR_DB_USER',
    pass: 'YOUR_DB_PASS',
    debug: true || false,
};
const nodeBlog = new NodeBlog(nodeBlogConfig);
```

We recommend creating a single file that will create the NodeBlog instance, and `export` this instance, and `import` in all other files where you want to use NodeJS Blog.

For security reasons we recommend using environment variables for loading the configuration. This is also in compliance with the [12 factor app Config guidelines](https://12factor.net/config)

Note: NodeJS blog was made to be used with PostgreSQL, but it should(/could) also be compatible with other databases, as it uses KnexJS under the hood.

## Running the API as a standalone service

To run NodeJS Blog as a standalone service, run `cp .env.example .env` to create the `.env` file.

Set your database details and preferences in the `.env` file and run `yarn run start`.

The API documentation can be generated using SwaggerUI. The contents can be found in `./swagger.yml`.

## Development

For development, the following commands are available:

| Command | Functionality |
| - | - |
| `yarn run dev` | Runs a `nodemon` server for the `server/server.js` file, and exposing the standalone service to your `localhost` |
| `yarn run lint` | Runs ESLint, for PRs this should always pass |
| `yarn run test` | Runs Jest once, for PRs this should always pass. Your database must be available as it is used to run tests on (beware: all existing data will be wiped, we recommend using a separate test-database, this can be set in the `.env` file) |
| `yarn run test:watch` | Same as `yarn run test`, but it Jest watches for changes |
| `yarn run coverage` | Creates coverage report, for this the test database should also be available |
| `yarn run migrate` | Migrates your database (normal one, not test database) to the most recent migration, seeds will not be ran |
| `yarn run reinstall` | Deletes the `node_modules/` folder and reinstalls everything, if you get some stange dependency errors, run this command |

### Folder structure

```md
.
├── controllers         Controllers for the module based API
├── database            All database related files
│   ├── migrations
│   └── seeds
├── helpers             Helper files, for example: logger, database instance
├── server
│   ├── controllers
│   ├── middleware
│   │   └── modules
│   └── routes
├── src                 Source directory for the API exposed by the module
└── tests               All tests written
    ├── config
    └── database
```

# Todo

* Add Yarn seed command
* Add authentication, password hashing -> also improve seed scripts
    * Add auth routes to get JWT
    * Using https://thejackalofjavascript.com/architecting-a-restful-node-js-app/
* Add performance testing script, maybe using https://k6.io/
* Later on, maybe add CLI for creating admin users using https://github.com/enquirer/enquirer
* Later on, add a CLI/application for loading .md files into the database as posts
* Make sure the application is available both as a NPM module and as a standalone service
* Integrate https://github.com/semantic-release/semantic-release
* Split up standalone and module
* Add XML feed

## Notes

* Node ENVs: development, production, test
