user: [

]

users have boards
boards have lists
lists have cards
cards have [
  titles:
  comments:
  Activity:
  Members:
  Labels:
  creationDate
  lastEdit
]


Trello's JSON data of a card
https://trello.com/card/59bc149331d9241823821489/fix-stocks.json


```js
User.findOne({username: 'a'})
  .populate('boards')
  .populate('lists')
  .populate('cards')

db.users.find({username: 'a'}).populate('boards')
