//how do you move a card from one list to another

//patch ops
"add", "remove", "replace", "move", "copy", or "test"

//data structure
listA: {
  cards: [cardA],
  ...
}

listA: {
  cards: [cardB],
  ...
}
cardA: {
  listId: listA,
  boardId: boardA,
  boardOwner: user,
  ...
}


////TRANSACTION style option 1
//front-end sends
```js
  //PATCH /list/:A
  {op: "test", path: "/cards/A", value: cardA},
  {op: "remove", path: "cards/A"},
  //PATCH /list/:B
  {op: "test", path: "/cards/A", value: null },
  {op: "add", path: "cards", value: cardA }
  //PATCH /card/:A
  {op: "test", path: "/listId", value: listA },
  {op: "replace", path: "/listId", value: listB }
  ```
//list1
  -remove
//list2
  -add
//card
  -listid change from 1 to 2


////TRANSACTION style option 2
//front-end sends
```js
  //PATCH /card/:A
  {op: "test", path: "../listA/cards", value: cardA},
  {op: "move" from: "../listA" to:"../listB"},
  {op: "replace", path: "/listId", value: listB }
  ```
//list1
  -remove
//list2
  -add
//card
  //listid change from 1 to 2
