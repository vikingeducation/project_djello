const models = require("./models");
const faker = require("faker");
const voca = require("voca");
const mongooseeder = require("mongooseeder");

let { User, Board } = models;

function seeds() {
  let users = [];
  for (let i = 0; i < 5; i++) {
    let user = new User({
      username: faker.random
        .words(2)
        .split(" ")
        .join(""),
      password: "pass"
    });
    users.push(user);
  }

  let boards = [];
  for (let i = 0; i < 20; i++) {
    let board = new Board({
      title: voca.titleCase(faker.random.words(4)),
      user: users[i % 10],
      description: faker.random.words(10)
    });
    users[i % 5].boards.push(board);
    board.members.push(users[i % 5]);
    boards.push(board);
  }

  const promises = [users, boards].reduce(
    (ps, collection) => ps.concat(collection.map(model => model.save())),
    []
  );

  return Promise.all(promises);
}

mongooseeder.seed({
  mongodbUrl: require("./config/mongoUrl"),
  models: models,
  clean: true,
  mongoose: require("mongoose"),
  seeds: seeds
});
