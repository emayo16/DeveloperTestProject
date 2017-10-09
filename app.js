"use strict";

var express = require("express");
var app = express();
var path = require("path");
var db = require("./app/database/db");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname));
var index = require("./app/client/index");
app.use("/", index);
var TrackController = require("./app/server/controllers/TrackController");
app.use("/api", TrackController);

module.exports = app;
