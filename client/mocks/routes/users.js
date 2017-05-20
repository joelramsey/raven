'use strict';

// Package imports
//
const express = require('express');

// Application imports
//
const data = require('./handlers/data/users.json');
const StaticHandler = require('./handlers').StaticDataHandler(data);


const router = express.Router();

router.use('/:userId', StaticHandler('getOne'));

module.exports = router;
