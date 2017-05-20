'use strict';

// Package imports
//
const express = require('express');

// Application imports
//
const data = require('./handlers/data/auth.json');
const StaticHandler = require('./handlers').StaticDataHandler(data);


const router = express.Router();

router.use('/validate_token', StaticHandler('validateToken'));
router.use('/sign_in', StaticHandler('signIn'));

module.exports = router;
