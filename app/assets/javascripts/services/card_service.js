djello.factory('cardService',
  ['Restangular',
  function(Restangular) {

    cardService = {};

    cardService.getAll = function(id) {
      return Restangular.all('cards').getList( { list_id: id });
    };

    cardService.createCard = function(newCard) {
      return Restangular.all('cards')
                        .post( { card: { list_id: newCard.list_id,
                                         title: newCard.title } } );
    };

    cardService.updateCard = function(updatedCard) {
      return Restangular.one('cards', updatedCard.id)
                        .patch( { card: { title: updatedCard.title,
                                          description: updatedCard.description } } );
    }

    cardService.updateList = function(card, list_id) {
      console.log('updating list')
      return Restangular.one('cards', card.id)
                        .patch( { card: { list_id: list_id } } );
    }

    cardService.markComplete = function(card) {
      return Restangular.one('cards', card.id)
                        .patch( { card: { completed: true } } );
    }


    return cardService;

  }])