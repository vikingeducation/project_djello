const app = require("../");
const request = require("request");
const mongoose = require("mongoose");
const models = require('../models');
const User = models.User;
const jwt = require('jsonwebtoken');
// const qs = require("qs");

describe("App", () => {
  const baseUrl = "http://localhost:8888";
  const apiUrl = baseUrl + "/api/v1/";
  const getJSON = str => JSON.parse(str);
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
      email: "foobar@gmail.com",
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

  it("sucessfully logs user in", done => {
    request.post(`${baseUrl}/sessions`, {form: {
      email: "foobar@gmail.com",
      password: "password"
    }}, (err, res, body) => {
      let result = getJSON(body);
      let decoded = jwt.decode(result.token, {complete: true});
      expect(result.token).toBeDefined();
      expect(decoded.payload.email).toBe("foobar@gmail.com");
      done();
    });
  });
});