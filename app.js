'use strict';

var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var TrackController = require('./track/controllers/TrackController');
app.use('/api', TrackController);

module.exports = app;