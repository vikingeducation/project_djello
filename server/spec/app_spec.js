const app = require("../");
const request = require("request");
const mongoose = require("mongoose");
const models = require('../models');
const User = models.User;
// const qs = require("qs");

describe("App", () => {
  let server;

  beforeAll(done => {
    server = app.listen(8888, () => {
      done();
    });
  });

  beforeEach(done => {
    User.create({
      fname: "Foo",
      lname: "Bar",
      email: "foobar@gmail",
      password: "password"
    }).then(result => {
      user = result;
      done();
    });
  });

  afterAll(done => {
    server.close();
    server = null;
    done();
  });

  it("successfully creates a user", done => {
    User.findOne()
      .then(user => {
        expect(user.fname).toBe("Foo");
        done();
      });
  });
});