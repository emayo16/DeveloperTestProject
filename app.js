'use strict';

var express = require('express');
var app = express();
var db = require('./app/database/db');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var TrackController = require('./app/server/controllers/TrackController');
app.use('/api', TrackController);

module.exports = app;
