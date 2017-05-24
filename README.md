# assignment_djello
Project management with that great wobbly taste.

xUsers : xBoards --UsersBoards +
1Owner : xBoards +
1Board : xLists +
1List : xCards +
1Card : xActivity +
1User : xActivity +
xCards : xUsers(members) --UsersCards +


User: id, email, password


Board: id, ownerid, name

List: id, boardid, title, description

Card: id, listid, title, description

Activity: id, description, cardid

Members User-Card: memberid-cardid

sequelize model:create --name User --attributes "email:string passwordHash:string"
sequelize model:create --name Board --attributes "name:string ownerId:integer"
sequelize model:create --name UsersBoards --attributes "userId:integer boardId:integer"
sequelize model:create --name List --attributes "boardId:integer title:string description:string"
sequelize model:create --name Card --attributes "listId:integer title:string description:string"
sequelize model:create --name UsersCards --attributes "memberId:integer cardId:integer"
sequelize model:create --name Activity --attributes "authorId:integer cardId:integer description:string"




