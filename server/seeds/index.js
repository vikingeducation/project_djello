const faker = require("faker");
faker.seed(123);

const { User, List, Board, Card } = require("../models");
const usersArray = [];
const boardsArray = [];
const listsArray = [];
const cardsArray = [];

// Make unique users for voting
module.exports = async function() {
  for (let i = 0; i < 5; i++) {
    usersArray.push(
      new User({
        email: `susan${i}@gmail.com`,
        password: "password",
        photoUrl:
          "https://singleblink.files.wordpress.com/2012/02/sterling-archer1.jpg",
        lists: [],
        cards: []
      })
    );
  }

  for (const user of usersArray) {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      await user.save();
    }
  }

  console.log("All Seeded Users Added to Database");

  for (let i = 0; i < 5; i++) {
    // all users share all boards for now
    let users = await User.find();

    boardsArray.push(
      new Board({
        title: faker.lorem.word(),
        lists: [],
        users: users.map(user => user._id)
      }).save()
    );
  }

  const boards = await Promise.all(boardsArray);

  // put boards in users
  let user;
  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < boards[i].users.length; j++) {
      user = await User.findById(boards[i].users[j]);
      user.boards.push(boards[i]._id);
      await user.save();
    }
  }

  console.log("All Seeded Boards Added to Database");

  for (let i = 0; i < 15; i++) {
    listsArray.push(
      new List({
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        cards: [],
        board: boards[Math.floor(Math.random() * 5)]._id
      }).save()
    );
  }

  const lists = await Promise.all(listsArray);

  let board;
  for (let i = 0; i < lists.length; i++) {
    board = await Board.findById(lists[i].board);
    board.lists.push(lists[i]._id);
    await board.save();
  }

  console.log("All Seeded Lists Added to Database");

  for (let i = 0; i < 50; i++) {
    cardsArray.push(
      new Card({
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        activites: [],
        list: lists[Math.floor(Math.random() * 15)]._id
      }).save()
    );
  }

  const cards = await Promise.all(cardsArray);

  let list;
  for (let i = 0; i < cards.length; i++) {
    list = await List.findById(cards[i].list);
    list.cards.push(cards[i]._id);
    await list.save();
  }

  console.log("All Seeded Cards Added to Database");
};
