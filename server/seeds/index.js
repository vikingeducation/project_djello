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

const { makeDefaultBoard } = require("../controllers");

seeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: async () => {
    //stock users for testing
    const card = await Card.create({
      title: "Suprah Awesome Card",
      description: "Amazement, pure DJELLOY goodness",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
    const card2 = await Card.create({
      title: "Suprah Awesome Card",
      description: "Amazement, pure DJELLOY goodness",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
    const list = await List.create({
      title: "Suprah Awesome List",
      description: "11/10 would list again",
      cards: [card, card2, randoCard()]
    });
    const board = await Board.create({
      title: "Suprah Awesome Board",
      lists: [list]
    });
    const card3 = await Card.create({
      title: "Suprah Awesome Card",
      description: "Amazement, pure DJELLOY goodness",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
    const card4 = await Card.create({
      title: "Suprah Awesome Card",
      description: "Amazement, pure DJELLOY goodness",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
    const list2 = await List.create({
      title: "Suprah Awesome List",
      description: "11/10 would list again",
      cards: [card3, card4]
    });
    const board2 = await Board.create({
      title: "Suprah Awesome Board",
      lists: [list2]
    });
    const defBoard = await makeDefaultBoard();
    console.log("defBoard = ", defBoard);
    User.create({
      username: "a",
      password: "a",
      accessToken: "DankMemez",
      boards: [defBoard, board, board2]
    });
    //TODO: FIX THE AMAZING SEEDER SO I CAN DO SOME ACCURATE STRESS TESTING LATER
    // for (var i = 0; i < numUsers; i++) {
    //   const user = await User.create({
    //     username: faker.name.findName(),
    //     password: faker.internet.password(),
    //     boards: createBoards(numBoards)
    //   });
    //   await user.save();
    // }
  }
});

const createCards = async () => {
  const cards = Array(numCards)
    .fill(0)
    .map(async () => {
      Card.create({
        title: "Suprah Awesome Card",
        description: "Such awesome, +++good",
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
        description: "11/10 would list again",
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
const randoCard = (() => {
  let counter = 0;
  return () => {
    return Card.create({
      title: `card${counter++}`,
      description: "stuff",
      comments: ["not implemented"],
      activity: ["not implemented"],
      members: ["not implemented"],
      labels: ["not implemented"]
    });
  };
})();
