djello.factory('cardService', ['Restangular', function(Restangular){
  function createCard (board, list, cardForm, currentUser) {
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
      var content = currentUser.user.email + " added this card to the " + list.name;
      addActivity(board, newCard, content);
    })
  }

  function updateCard(board, oldCard, cardForm, nameMsg, contentMsg) {
    board.data.one('cards', oldCard.id).get().then(function(cardRecord){

      cardRecord.name = cardForm.name;
      cardRecord.content = cardForm.content;
      cardRecord.put().then(function(updatedCard){
        if (nameMsg) {
          addActivity(board, oldCard, nameMsg);
        } 
        if (contentMsg) {
          addActivity(board, oldCard, contentMsg);
        }
        oldCard.name = updatedCard.name;
        oldCard.content = updatedCard.content;
      });
    });
  }

  function addActivity(board, card, content) {
    board.data.all("activities").post({
      activity: {      
        card_id: card.id,
        content: content
      }
    })
    .then(function(newActivity){
      card.activities.push(newActivity);
    })
  }

  return {
    createCard: createCard,
    updateCard: updateCard
  }
}])