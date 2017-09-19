ENTITY TABLES

USER (hasmany boards and cards):
  Email: required, unique
  Password: required (1 or more characters)
  Image: Optional (blob)

BOARD (hasmany cards belongsToMany users):
  Title: required, string (above 1 character)
  Description: required, string (above 1 character)

CARD (belongsTo BOARD hasmany activities):
  Title: required, string
  Description: required
  Priority: (integer from 0 and above)
  Board_Id: required

ACTIVITY (belongsTo CARD):
  Description: required,
  Date: required
  Card_id: required

JOIN TABLES

UsersBoards:
  User_Id: required,
  Board_Id: required

UsersCards:
  User_Id: required,
  Card_Id: required
