# NodeJS Blog API

# Routes

All are /api/[route]

All are GET by default

POST routes are protected

# Todo

* Fix Travis testing script, Postgres integration
* Add authentication, password hashing -> also improve seed scripts
    * Add auth routes to get JWT
    * Using https://thejackalofjavascript.com/architecting-a-restful-node-js-app/
* Set all Knex stuff to ./db folder
* Create documentation, API documentation using Swagger
* Add performance testing script, maybe using https://k6.io/
* Improve node_env checking
* Later on, maybe add CLI for creating admin users
* Later on, add a CLI/application for loading .md files into the database as posts
* Make sure the application is available both as a NPM module and as a standalone service

## Notes

* Node ENVs: DEVELOPMENT, PRODUCTION, TEST
