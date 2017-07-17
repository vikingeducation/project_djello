# assignment_djello
Project management with that great wobbly taste.

-models for users, boards, lists, cards
-start creating api routes for post/put/get/delete for boards, lists, and cards WITH TESTS
-make sure you have model that allows for users to be connected to boards by being added as a card member < ONLY PLACE WHERE MEMBERS ARE CONNECTED, SO TO SPEAK
/api/users/:user/board < post method for adding to user's boards array

NOW:
  2. then, create tests for the following routes:
    delete: board if connected to authenticated user
    put: board/:id/users for adding user to a board
    put: users/:id/boards for adding board to a user (use mongo addToSet)
    get: users/:id/boards for initial population of react state (should include all [lists/etc.])

    what helpers do we need for tests?
    already have user
    for putting/getting/deleting:
      -create initial board for gettin
      -create second user, use their id for putting
      -create a second board, use its id for putting
