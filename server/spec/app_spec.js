const app = require("../");
const request = require("request");
const mongoose = require("mongoose");
const models = require('../models');
const User = models.User;
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

describe("App", () => {
  const baseUrl = "http://localhost:8888";
  const apiUrl = baseUrl + "/api/v1";
  const getJSON = str => JSON.parse(str);
  const log = obj => { 
    let msg = JSON.stringify(obj, null, 2)
    process.stdout.write(
      chalk.cyanBright.bold.underline(msg)
    ); 
  };
  
  let server;
  let user;

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

  it("successfully grabs user info from api", done => {
    request.get(`${apiUrl}/users/${user.id}`, (err, res, body) => {
      let result = getJSON(body);

      expect(res.statusCode).toBe(200);
      expect(result.data.email).toBe("foobar@gmail.com");
      done();
    });
  });

  it("returns an error when searching for non-existent user", done => {
    request.get(`${apiUrl}/users/123`, (err, res, body) => {
      let result = getJSON(body);
      expect(res.statusCode).toBe(400);
      expect(result.error).toBeDefined();
      done();
    });
  });

  it("rejects an unauthorized request", done => {
    request.get(`${apiUrl}/users`, (ress, res, body) => {
      let result = getJSON(body);

      expect(res.statusCode).toBe(401);
      done();
    });
  });
});