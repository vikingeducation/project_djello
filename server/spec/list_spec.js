const app = require("../");
const rp = require("request-promise");
const mongoose = require("mongoose");
const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List
const helpers = require('./helpers');

describe("List", () => {
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
    let list;

    beforeEach(done => {
      List.create({
        title: "Test Original List Title",
        description: "Test Original List Description",
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
          expect(results.title).toBe("Test Original List Title");
          done();
        });
    });

    it("creates a list through the api", done => {
      let options = {
        method: "POST",
        uri: `${apiUrl}/boards/${board.id}/lists`,
        auth: {
          bearer: token
        },
        form: {
          title: "Test New List Title",
          description: "Test New List Description",
          cards: []
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Test New List Title");
          expect(res.body.data.description).toBe("Test New List Description");
          return List.findById(res.body.data.id);
        })
        .then(result => {
          expect(result).toBeDefined();
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("updates a list title", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/lists/${list.id}`,
        auth: {
          bearer: token
        },
        form: {
          title: "Changed List Title"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Changed List Title");
          expect(res.body.data.description).toBe("Test Original List Description");
          return List.findById(list.id);
        })
        .then(result => {
          expect(result.title).toBe("Changed List Title");
          expect(result.description).toBe("Test Original List Description");
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("updates a list description", done => {
      let options = {
        method: "PUT",
        uri: `${apiUrl}/lists/${list.id}`,
        auth: {
          bearer: token
        },
        form: {
          description: "Changed List Description"
        },
        json: true,
        resolveWithFullResponse: true
      };

      rp(options)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.data.title).toBe("Test Original List Title");
          expect(res.body.data.description).toBe("Changed List Description");
          return List.findById(list.id);
        })
        .then(result => {
          expect(result.title).toBe("Test Original List Title");
          expect(result.description).toBe("Changed List Description");
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });

    it("deletes a list", done => {
      let options = {
        method: "DELETE",
        uri: `${apiUrl}/lists/${list.id}`,
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
          return List.findById(list.id);
        })
        .then(result => {
          expect(result).toEqual(null);
          done();
        })
        .catch(error => {
          expect(error).toEqual(null);
          done();
        });
    });
  });
});
