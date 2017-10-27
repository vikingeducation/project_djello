const mongoose = require("mongoose");
const Promise = require("bluebird");
mongoose.Promise = Promise;
const env = process.env.NODE_ENV || "development";
const config = require("./config/mongo")[env];

module.exports = () => {
  const envUrl = process.env[config.use_env_variable];
  const localUrl = `mongodb://${config.host}/${config.database}`;
  const mongoUrl = envUrl ? envUrl : localUrl;
  return mongoose.connect(mongoUrl, { useMongoClient: true });
};

/*
User.find().then(usr => (user = usr));
User.find().then(user => lg(user.boards));
User.findOne()
  .populate("boards")
  .then(data => lg(data.boards));
User.findOne()
  .populate("boards")
  .populate("lists")
  .populate("cards")
  .then(lg);
*/
