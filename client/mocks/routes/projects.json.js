'use strict';

// Package imports
//
const express = require('express');

// Application imports
//
const data = require('./handlers/data/projects.json');
const StaticHandler = require('./handlers').StaticDataHandler(data);


const router = express.Router();

// Note - these routes are handled in order.
router.use('/', StaticHandler('getOne'));

module.exports = router;
