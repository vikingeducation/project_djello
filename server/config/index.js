const mongoose = require("mongoose");
const bluebird = require("bluebird");
mongoose.Promise = bluebird;

module.exports = function(url) {
  mongoose
    .connect(url, {
      useMongoClient: true
    })
    .then(db => {
      console.log("Connected!");
    })
    .catch(err => console.error(err));
};
