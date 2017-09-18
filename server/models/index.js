const mongoose = require("mongoose");

const models = {};

models.User = require("./User");
models.Board = require("./Board");
models.List = require("./List");
models.Card = require("./Card");
models.Activity = require("./Activity");

module.exports = models;