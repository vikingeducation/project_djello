const app = require("../");
const request = require("request");
const mongoose = require("mongoose");
// const User = mongoose.model("User");
// const qs = require("qs");

describe("App", () => {
  let server;

  beforeAll(done => {
    server = app.listen(8888, () => {
      done();
    });
  });

  afterAll(done => {
    server.close();
    server = null;
    done();
  });
});