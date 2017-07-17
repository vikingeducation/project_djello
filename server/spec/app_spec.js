const app = require("../");
const request = require("request");
const rp = require('request-promise');
const mongoose = require("mongoose");
const models = require('../models');
const User = models.User;
const Board = models.Board;
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
  let board;

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
    Create User
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
  
  /*  ===============
    Create Board
  ================ */  
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

  it("successfully creates a board", done => {
    Board.findOne()
      .then(board => {
        expect(board.title).toBe("Test Board");
        done();
      });
  });

  it("successfully creates a user", done => {
    User.findOne()
      .then(user => {
        expect(user.email).toBe("foobar@gmail.com");
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

  /*  ===============
    API Tests
  ================ */
  describe("API", () => {
    let token;

    beforeEach(done => {
      let loginOpts = {
        method: 'POST',
        uri: `${baseUrl}/sessions`,
        form: {
          email: "foobar@gmail.com",
          password: "password"
        },
        json: true
      };
  
      rp(loginOpts)
        .then(result => {
          token = result.token;
          done();
        })
    });

    it("rejects an unauthorized request", done => {
      request.get(`${apiUrl}/users`, {
        'auth': {
          'bearer': null
        }
      }, (err, res, body) => {
        let result = getJSON(body);
        expect(res.statusCode).toBe(401);
        done();
      });
    });
  
    it("accepts an authorized request", done => {
      let options = {
        method: 'GET',
        uri: `${apiUrl}/users`,
        auth: {
          'bearer': token
        },
        json: true
      }
      rp(options)
        .then(results => {
          expect(results.data).toBeDefined();
          done();
        })
        .catch(error => {
          expect(error).toEqual(null)
          done();
        });
    });

    it("successfully grabs user info from api", done => {
      let options = {
        method: 'GET',
        uri: `${apiUrl}/users/${user.id}`,
        auth: {
          'bearer': token
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
          expect(error).toEqual(null)
          done();
        });
    });
  
    it("returns an error when searching for non-existent user", done => {
      let options = {
        method: 'GET',
        uri: `${apiUrl}/users/123`,
        auth: {
          'bearer': token
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

    describe("Board", () => {
      it("creates a new board", done => {
        let options = {
          method: 'POST',
          uri: `${apiUrl}/boards`,
          auth: {
            'bearer': token
          },
          form: {
            title: "Test Board POST",
            lists: [],
            users: [user.id]
          },
          json: true,
          resolveWithFullResponse: true
        };
  
        rp(options)
          .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body.data.title).toBe("Test Board POST");
            done();
          })
          .catch(error => {
            expect(error).toEqual(null)
            done();
          });
      });
    });
  });
});