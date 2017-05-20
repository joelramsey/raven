'use strict';

// Package imports
//
const express = require('express');


const router = express.Router();

router.use('/articles.json', require('./articles'));
router.use('/auth', require('./auth'));
router.use('/projects', require('./projects'));
router.use('/projects.json', require('./projects.json'));
router.use('/resolutions', require('./resolutions'));
router.use('/users', require('./users'));

module.exports = router;
