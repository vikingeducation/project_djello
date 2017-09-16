//import all our models
const User = require("./User");
const Board = require("./Board");
const List = require("./List");
const Card = require("./Card");

module.exports = {
  User,
  Board,
  List,
  Card
};
/* mongoose test code
const user = await User.findOne(query).populate('boards')
const query = {username: 'a'}
const user = new Promise( (resolve, reject) =>{
  User.findOne(query).then(resolve)
})
const board = new Promise( (resolve, reject) =>{
  user.then( user => user.board[0])
})
User.
findOne({ username: 'a' }).
populate({
  path: 'boards',
  populate: {
    path: 'lists',
    populate: {
      path: 'cards'
    }
  }
}).then(user => lg(user.boards[0].lists[0]))
User.
findOne({ username: 'a' }).
populate({
  path: 'boards',
  populate: 'lists'
}).then(lg)




User.findOne(query).populate('boards')
.then( user =>{
  let populatedUser = user
  populatedUser.boards = user.boards.map( board => {
    board.
  })
  return user
}).populate('lists').then(lg)
*/
