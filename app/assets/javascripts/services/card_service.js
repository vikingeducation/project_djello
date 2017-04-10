djello.factory('cardService',
  ['Restangular',
  function(Restangular) {

    cardService = {};

    cardService.getAll = function(id) {
      return Restangular.all('cards').getList( { list_id: id });
    }

    cardService.createCard = function(newCard) {
      return Restangular.all('cards')
                        .post( { card: { list_id: newCard.list_id,
                                         title: newCard.title } } );
    }

    cardService.delete = function(card) {
      return Restangular.one('cards', card.id)
                        .remove( { id: card.id } );
    }


    return cardService;

  }])