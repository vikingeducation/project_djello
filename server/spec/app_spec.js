const app = require("../");
const request = require("request");
const rp = require("request-promise");
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List
const jwt = require("jsonwebtoken");
const helpers = require('./helpers');

describe("App", () => {
  const {baseUrl, apiUrl, getJSON, log} = helpers;

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
  
  /*  ===============
    Basic Tests
  ================ */
  it("successfully creates a board", done => {
    Board.findOne().then(board => {
      expect(board.title).toBe("Test Board");
      done();
    });
  });

  it("successfully creates a user", done => {
    User.findOne().then(user => {
      expect(user.email).toBe("foobar@gmail.com");
      done();
    });
  });

  it("sucessfully logs user in", done => {
    request.post(
      `${baseUrl}/sessions`,
      {
        form: {
          email: "foobar@gmail.com",
          password: "password"
        }
      },
      (err, res, body) => {
        let result = getJSON(body);
        let decoded = jwt.decode(result.token, { complete: true });
        expect(result.token).toBeDefined();
        expect(decoded.payload.email).toBe("foobar@gmail.com");
        done();
      }
    );
  });


  /*  ===============
    Basic API Tests
  ================ */
  describe("Basic API", () => {
    let token;

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

    it("rejects an unauthorized request", done => {
      request.get(
        `${apiUrl}/users`,
        {
          auth: {
            bearer: null
          }
        },
        (err, res, body) => {
          let result = getJSON(body);
          expect(res.statusCode).toBe(401);
          done();
        }
      );
    });

    it("accepts an authorized request", done => {
      let options = {
        method: "GET",
        uri: `${apiUrl}/users`,
        auth: {
          bearer: token
        },
        json: true
      };
      rp(options)
        .then(results => {
          expect(results.data).toBeDefined();
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });



    
  });
});
