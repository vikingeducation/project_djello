const faker = require("faker");
const MULTIPLIER = 5;

module.exports = () => {
  // ----------------------------------------
  // Creating Users
  // ----------------------------------------
  console.log("Creating users...");
  let users = [];
  for (let i = 0; i < 2; i++) {
    let user = new User({
      email: `foobar${i}@gmail.com`,
      password: "password"
    });
    users.push(user);
  }

  // ----------------------------------------
  // Creating Boards
  // ----------------------------------------
  console.log("Creating boards...");
  let boards = [];
  for (let i = 0; i < MULTIPLIER; i++) {
    let board = new Board({
      title: `Test Board ${i + 1}`,
      lists: [],
      users: [users[i % users.length]]
    });
    boards.push(board);
    users[i % users.length].boards.push(board);
  }

  // ----------------------------------------
  // Creating Lists
  // ----------------------------------------
  console.log("Creating lists...");
  let lists = [];
  for (let i = 0; i < MULTIPLIER * 5; i++) {
    let list = new List({
      title: `Test List ${i + 1}`,
      description: faker.lorem.sentences(1),
      board: boards[i % boards.length],
      cards: []
    });
    lists.push(list);
    boards[i % boards.length].lists.push(list);
  }

  // ----------------------------------------
  // Creating Cards
  // ----------------------------------------
  console.log("Creating cards...");
  let cards = [];
  for (let i = 0; i < MULTIPLIER * 50; i++) {
    let card = new Card({
      title: `Test Card ${i + 1}`,
      description: faker.lorem.sentences(1),
      list: lists[i % lists.length],
      activities: [],
      members: users[i % users.length]
    });
    cards.push(card);
    lists[i % lists.length].cards.push(card);
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  let promises = [];
  [users, boards, lists, cards].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
