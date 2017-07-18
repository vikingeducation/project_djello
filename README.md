# assignment_djello
Project management with that great wobbly taste.


NOW:
  tuesday:
  crud for lists, cards, card activity feed (trickiest one)
    -just add activity feed as a "hook" on put requests
    -each card has members array
    -client makes two requests ->
      -PUT: cards/:id/users to modify members of cards
      -POST: boards/:id/users to grant membership to same user
      OOOOOOOORRRRRRRRRRR

      ****
      -THE ONLY TIME WE ADD A USER TO A BOARD IS THROUGH CARD
        -leave old routes, but truth is, YAGNI...
        -SOOO... cards/:id/users also modifies related board and user
        -we save the client from making multiple requests
        -and we simplify our architecture
        -There's no use case where user adds another user to a board; only through cards is this functionality allowed
        
      ****


      -since we do not have a special "cards" view, we do not need
      user document to hold cards, since any boards they are part of
      encompass this
      -so user model does not change :)

  add breaking cases for some tests, think of whatcha can
  