const app = require("../");
const rp = require("request-promise");
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List
const helpers = require('./helpers');

describe("User", () => {
  const {baseUrl, apiUrl, getJSON, log} = helpers;

  let server;
  let user;
  let board;
  let token;

  /*  ===============
    Manage Server
  ================ */
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

  /*  ===============
    Create Resources
  ================ */

  beforeEach(done => {
    User.create({
      email: "foobar@gmail.com",
      password: "password"
    }).then(result => {
      user = result;
      done();
    });
  });

  beforeEach(done => {
    Board.create({
      title: "Test Board",
      lists: [],
      users: [user.id]
    }).then(result => {
      board = result;
      done();
    });
  });
  
  beforeEach(done => {
    let loginOpts = {
      method: "POST",
      uri: `${baseUrl}/sessions`,
      form: {
        email: "foobar@gmail.com",
        password: "password"
      },
      json: true
    };

    rp(loginOpts).then(result => {
      token = result.token;
      done();
    });
  });

  /*  ===============
    User Tests
  ================ */
  describe("API", () => {
    it("successfully grabs user info from api", done => {
      let options = {
        method: "GET",
        uri: `${apiUrl}/users/${user.id}`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.email).toBe("foobar@gmail.com");
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("returns an error when searching for non-existent user", done => {
      let options = {
        method: "GET",
        uri: `${apiUrl}/users/123`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res).toEqual(null);
          done();
        })
        .catch(error => {
          expect(error.statusCode).toBe(400);
          expect(error.response.body.error).toBeDefined();
          done();
        });
    });

    it("returns the current user's boards", done => {
      let options = {
        method: "GET",
        uri: `${apiUrl}/users/${user.id}/boards`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };
      User.findByIdAndUpdate(user.id, {
        $addToSet: { boards: board.id }
      })
        .then(() => {
          return rp(options);
        })
        .then(res => {
          expect(Array.isArray(res.body.data)).toBe(true);
          expect(res.body.data.length).toBe(1);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });
  });
});
