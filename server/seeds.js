const models = require("./models");
const faker = require("faker");
const voca = require("voca");
const mongooseeder = require("mongooseeder");

let { User, Board, List, Card } = models;

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
      user: users[i % 10]
    });
    users[i % 5].boards.push(board);
    board.members.push(users[i % 5]);
    boards.push(board);
  }

  let lists = [];
  for (let i = 0; i < 60; i++) {
    let list = new List({
      title: voca.titleCase(faker.random.words(4)),
      description: faker.random.words(10),
      board: boards[i % 20]
    });
    boards[i % 20].lists.push(list);
    lists.push(list);
  }

  let cards = [];
  for (let i = 0; i < 120; i++) {
    let card = new Card({
      title: voca.titleCase(faker.random.words(4)),
      body: faker.random.words(20),
      list: lists[i % 60],
      members: [users[i % 5]]
    });
    lists[i % 60].cards.push(card);
    users[i % 5].cards.push(card);
    cards.push(card);
  }

  const promises = [users, boards, lists, cards].reduce(
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
