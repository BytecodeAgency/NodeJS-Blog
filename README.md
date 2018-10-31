# NodeJS Blog API

# Routes

All are /api/[route]

All are GET by default

POST routes are protected

* posts
* post/:id
* post (POST)
* authors
* author/:name
* author (POST)
* status

# Todo

* Add TDD configuration
* For testing add SQLite support
* Create Restify/Express server
* See if https://github.com/Vincit/knex-db-manager might be a viable option
* Integrate Helmet or similar
* Add authentication
* Configure routing
* Create documentation, API documentation using Swagger
* Add performance testing script, maybe using https://k6.io/
* Later on, maybe add CLI for creating admin users
* Later on, add support for caching results

## Notes

* Node ENVs: DEVELOPMENT, PRODUCTION, TEST
