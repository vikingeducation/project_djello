const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
module.exports = {
  Activity: require("./Activity"),
  Board: require("./Board"),
  Card: require("./Card"),
  List: require("./List"),
  User: require("./User")
};
