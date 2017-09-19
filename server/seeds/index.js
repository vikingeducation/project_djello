const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const models = require('../models');
var env = process.env.NODE_ENV || "development";
var config = require("./../config/mongo")[env];

const mongodbUrl = process.env.NODE_ENV === "production"
    ? process.env[config.use_env_variable]
    : `mongodb://${config.host}/${config.database}`;

const { User, Board, List, Card, Activity } = models;

const seeds = ()=>{
// Users
  let users = [];
  for (let i=0; i<2; i++) {
    let user = new User ({
      email: `user${i}@email.com`,
      password: 'password',
      boards: []
    });
    users.push(user);
  }

  //Boards
  let boards = [];
  for (let i=0; i<2; i++) {
    let board = new Board ({
      title: `Board_${i}`,
      lists: [],
      users: users[0]
    })
    boards.push(board);
    users[0].boards.push(board)
  }

  // Lists
  let lists = [];
  let j;
  for (let i=0; i<4; i++) {
    i>1 ? (j=i-2) : (j=i);
    let list = new List({
      title: `List_${i}`,
      description: `This is a description for List # ${i}`,
      board: boards[j],
      cards: []
    })
    boards[j].lists.push(list);
    lists.push(list);
  }

  //Cards
  let cards = [];
  for (let i=0; i<8; i++) {
    i>3 ? (j=i-4) : (j=i);
    let card = new Card({
      title: `Card_${i}`,
      description: `This is a description for Card # ${i}`,
      list: lists[j],
      users: [users[0]],
      activities: []
    })
    lists[j].cards.push(card);
    cards.push(card);
  }

  //Activities
  let activities = [];
  for (let i=0; i<16; i++) {
    i>7 ? (j=i-8) : (j=i);
    let activity = new Activity({
      description: `This is a description for Activity # ${i}`,
      card: cards[j]
    })
    cards[j].activities.push(activity);
    activities.push(activity);
  }

  //Now put them all together
  let promises = [];
  [users, boards, lists, cards, activities].forEach(collection=>{
    collection.forEach(model=>{
      promises.push(model.save());
    })
  })
  return Promise.all(promises);
}

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: seeds
});