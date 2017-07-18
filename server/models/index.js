const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

const models = {};

models.User = require("./User");
models.Board = require("./Board");
models.List = require("./List");
models.Card = require("./Card");

module.exports = models;
