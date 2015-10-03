djello.factory('cardService', ['Restangular', function(Restangular){
  function createCard (board, list, cardForm) {
    board.data.all('cards').post({
      card: {
        name: cardForm.name,
        content: cardForm.content,
        list_id: list.id
      }
    })
    .then(function(newCard){
      list.cards = list.cards || [];
      list.cards.push(newCard);
      cardForm = {};
      // var content = currentUser.email + " added this card to the " + list.name;
      // addActivity(newCard, content);
    })
  }

  function updateCard(board, oldCard, cardForm, nameMsg, contentMsg) {
    board.data.one('cards', oldCard.id).get().then(function(card){

      card.name = cardForm.name;
      card.content = cardForm.content;
      card.put().then(function(){
        // if (nameMsg) {
        //   addActivity(card, nameMsg);
        // } else if (contentMsg) {
        //   addActivity(card, contentMsg);
        // }
        oldCard.name = card.name;
        oldCard.content = card.content;
      });
    });
  }

  return {
    createCard: createCard,
    updateCard: updateCard
  }
}])