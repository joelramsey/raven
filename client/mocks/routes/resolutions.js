'use strict';

// Package imports
//
const express = require('express');

// Application imports
//
const data = require('./handlers/data/resolutions.json');
const StaticHandler = require('./handlers').StaticDataHandler(data);


const router = express.Router();

router.use('/', StaticHandler('getAll'));

module.exports = router;
