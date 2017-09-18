require("../mongo")();

const { User, Board, Card, List } = require("../models");

let users = [];
let boards = [];
let lists = [];
let cards = [];

for (let i = 0; i < 10; i++) {
  console.log(`iteration ${i + 1}`);
  const user = new User({
    email: `Ian${i}@ian.com`,
    password: `Ian${i}`,
    boards: []
  });
  const board = new Board({
    title: `Your first board...`,
    description: `Try creating a card...`,
    lists: []
  });
  const list = new List({
    title: `Your first list...`,
    description: `Try creating a list...`,
    cards: []
  });
  const card = new Card({
    text: "sample card"
  });

  user.boards.push(board);
  users.push(user);

  board.lists.push(list);
  boards.push(board);

  list.cards.push(card);
  lists.push(list);

  cards.push(card);
}

let promises = [];
users.forEach(user => {
  promises.push(user.save());
});

boards.forEach(board => {
  promises.push(board.save());
});

lists.forEach(list => {
  promises.push(list.save());
});

cards.forEach(card => {
  promises.push(card.save());
});

Promise.all(promises).then(users => {
  console.log("saved");
  return true;
});
