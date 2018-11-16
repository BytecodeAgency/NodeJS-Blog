const controllers = require('../controllers');
const router = require('express').Router();

// eslint-disable-next-line
const { Status, Authors, Users, Categories, Posts } = controllers;

// Status
router.get('/', Status.ok);
router.get('/status', Status.ok);

// Authors
router.get('/authors', Authors.list);
router.get('/authors/:id', Authors.show);
router.post('/authors', Authors.create);
router.put('/authors:id', Authors.update);
router.delete('/authors:id', Authors.remove);

// Users
router.get('/users', Users.list);
router.get('/users/:id', Users.show);
router.post('/users', Users.create);
router.put('/users:id', Users.update);
router.delete('/users:id', Users.remove);

// Categories
router.get('/categories', Categories.list);
router.get('/categories/:id', Categories.show);
router.post('/categories', Categories.create);
router.put('/categories/:id', Categories.update);
router.delete('/categories/:id', Categories.remove);

// Posts
router.get('/posts', Posts.list);
router.get('/posts/:id', Posts.show);
router.post('/posts', Posts.create);
router.put('/posts/:id', Posts.update);
router.delete('/posts/:id', Posts.remove);

module.exports = router;
