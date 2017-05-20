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
router.use('/:projectId/records/:recordId', StaticHandler('getOneRecord'));
router.use('/:projectId/records', StaticHandler('getAllRecords'));
router.use('/:projectId', StaticHandler('getOne'));
router.use('/', StaticHandler('getAll'));

module.exports = router;
