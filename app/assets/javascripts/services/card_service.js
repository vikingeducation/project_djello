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

    cardService.delete = function(card) {
      return Restangular.one('cards', card.id)
                        .remove( { id: card.id } );
    };


    return cardService;

  }])