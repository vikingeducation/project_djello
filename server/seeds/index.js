const seeder = require("mongooseeder");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const models = require("../models");
const { User, Board, List, Card } = models;
const faker = require("faker");
const mongodbUrl = "mongodb://localhost/project_djello_dev";

const numUsers = 1;
const numBoards = 1;
const numLists = 3;
const numCards = 3;

seeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: async () => {
    //stock users for testing
    User.create({
      username: "Bob",
      password: "blaahhh",
      boards: []
    });
    User.create({
      username: "Karl",
      password: "KarlRules",
      boards: []
    });
    User.create({
      username: "a",
      password: "a",
      boards: []
    });
    for (var i = 0; i < numUsers; i++) {
      const user = await User.create({
        username: faker.name.findName(),
        password: faker.internet.password(),
        boards: createBoards(numBoards)
      });
      await user.save();
    }
  }
});

const createCards = async () => {
  const cards = Array(numCards)
    .fill(0)
    .map(async () => {
      Card.create({
        title: "Suprah Awesome Card",
        comments: ["Much cool"],
        activity: [],
        members: [],
        labels: ["best"]
      });
    });
  return await Promise.all(cards);
};
const createLists = async () => {
  const lists = Array(numLists)
    .fill(0)
    .map(async () => {
      await List.create({
        title: "Suprah Awesome List",
        cards: await createCards()
      });
    });
  return await Promise.all(lists);
};
const createBoards = async () => {
  const boards = Array(numBoards)
    .fill(0)
    .map(async () => {
      await Board.create({
        title: "Suprah Awesome Board",
        lists: await createLists()
      });
    });
  return await Promise.all(boards);
};
