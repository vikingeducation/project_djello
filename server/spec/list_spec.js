const app = require("../");
const rp = require("request-promise");
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List
const helpers = require('./helpers');

describe("App", () => {
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
  describe("List", () => {
    let list;

    beforeEach(done => {
      List.create({
        title: "Test List",
        description: "Test Description",
        board: board.id,
        cards: []
      }).then(result => {
        list = result;
        done();
      });
    });

    it("successfully creates a list", done => {
      List.findById(list.id)
        .then(results => {
          expect(results.title).toBe("Test List");
          done();
        });
    });
  });
});
