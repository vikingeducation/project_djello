const app = require("../");
const rp = require("request-promise");
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List
const helpers = require('./helpers');

describe("Board", () => {
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
    Board Tests
  ================ */
  describe("API", () => {
    it("creates a new board through api", done => {
      let options = {
        method: "POST",
        uri: `${apiUrl}/boards`,
        auth: {
          bearer: token
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
          return User.findById(user.id);
        })
        .then(result => {
          expect(result.boards.length).toBe(1);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("deletes a board", done => {
      let options = {
        method: "DELETE",
        uri: `${apiUrl}/boards/${board.id}`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe(
            "Resource successfully removed."
          );
          return Board.findById(board.id);
        })
        .then(board => {
          expect(board).toEqual(null);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("adds a second user to a board and updates models", done => {
      let options = {
        method: "POST",
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      User.create({
        email: "foobar2@gmail.com",
        password: "password"
      })
        .then(secondUser => {
          options.uri = `${apiUrl}/boards/${board.id}/users/${secondUser.id}`;
          return rp(options);
        })
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.board.users.length).toBe(2);
          expect(res.body.data.user.boards.length).toBe(1);
          expect(res.body.message).toBe("Resource successfully updated.");
          return Board.findById(board.id);
        })
        .then(board => {
          expect(board.users.length).toBe(2);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("pops a user from a board and updates modes", done => {
      let options = {
        method: "DELETE",
        uri: `${apiUrl}/boards/${board.id}/users/${user.id}`,
        auth: {
          bearer: token
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.board.users.length).toBe(0);
          expect(res.body.data.user.boards.length).toBe(0);
          expect(res.body.message).toBe("Resource successfully updated.");
          return Board.findById(board.id);
        })
        .then(board => {
          expect(board.users.length).toBe(0);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("successfully updates a board title", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/boards/${board.id}`,
        auth: {
          bearer: token
        },
        form: {
          title: "Changed Title"
        },
        json: true,
        resolveWithFullResponse: true
      };
      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Changed Title");
          return Board.findById(board.id);
        })
        .then(result => {
          expect(result.title).toBe("Changed Title");
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });
  });
});
