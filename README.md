# NodeJS Blog API
[![Project maintainers](https://img.shields.io/badge/Project%20maintained%20by-Bytecode%20Digital%20Agency-brightgreen.svg)](https://bytecode.nl)

[![Build Status](https://travis-ci.org/lucianonooijen/NodeJS-Blog.svg?branch=master)](https://travis-ci.org/lucianonooijen/NodeJS-Blog)
[![Version Badge](http://versionbadg.es//lucianonooijen/https://github.com/lucianonooijen/NodeJS-Blog.svg)](https://npmjs.org/package/nodejs-blog)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

Blog API developed by Bytecode Digital Agency as free (as in freedom) open source software. Built in NodeJS. Available as a standalone server, or as a NPM package

# API routes

The API documentation can be generated using SwaggerUI. The contents can be found in `./swagger.yml`

# Todo

* Fix Travis testing script, Postgres integration
* Add authentication, password hashing -> also improve seed scripts
    * Add auth routes to get JWT
    * Using https://thejackalofjavascript.com/architecting-a-restful-node-js-app/
* Set all Knex stuff to ./db folder
* Create documentation, API documentation using Swagger
* Add performance testing script, maybe using https://k6.io/
* Improve node_env checking
* Later on, maybe add CLI for creating admin users using https://github.com/enquirer/enquirer
* Later on, add a CLI/application for loading .md files into the database as posts
* Make sure the application is available both as a NPM module and as a standalone service

## Notes

* Node ENVs: DEVELOPMENT, PRODUCTION, TEST
