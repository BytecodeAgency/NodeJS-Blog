const controllers = require('../controllers');
const router = require('express').Router();

const {
    RootController,
} = controllers;

router.get('/', RootController);

module.exports = router;
