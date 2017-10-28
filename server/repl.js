// repl.js
const mongoose = require("mongoose");
const models = require("./models");
const options = {
  prompt: "mongorepl> ",
  breakEvalOnSigint: true
};
const repl = require("repl").start(options);

// connect
require("./mongo")().then(() => {
  // Set `models` global
  repl.context.models = models;

  // model globals
  Object.keys(models).forEach(modelName => {
    repl.context[modelName] = mongoose.model(modelName);
  });

  // logger
  repl.context.lg = data => console.log(data);
});
