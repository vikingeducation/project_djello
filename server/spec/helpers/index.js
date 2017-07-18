const mongoose = require("mongoose");
const chalk = require("chalk");

// Set test environment
process.env.NODE_ENV = "test";

beforeAll(done => {
  if (mongoose.connection.readyState) {
    done();
  } else {
    require("./../../mongo")().then(() => done());
  }
});

afterEach(done => {
  require("./../../seeds/clean")()
    .then(() => done())
    .catch(e => console.error(e.stack));
});

let helpers = {};

helpers.baseUrl = "http://localhost:8888";
helpers.apiUrl = helpers.baseUrl + "/api/v1";

helpers.getJSON = str => JSON.parse(str),

helpers.log = obj => {
  let msg = JSON.stringify(obj, null, 2);
  process.stdout.write(chalk.cyanBright.bold.underline(msg));
}

module.exports = helpers;