'use strict';

// Package imports
//
const express = require('express');

// Application imports
//
const routes = require('./routes/index');
const app = express();

// Initialize routes
//
app.use('/api', routes);

// Start
//
app.listen(3000);
