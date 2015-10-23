djello.factory('cardService',
  ['Restangular',
  function(Restangular) {

    var cardService = {};


    cardService.getCards = function(list) {
      return list.cards;
    };


    cardService.create = function(list) {
      return Restangular.all('cards').post( { list_id: list.id } )
    };


    cardService.findByID = function(list, id) {
      return list.cards.filter( function(card) {
        return (card.id === Number(id))
      })[0];
    };


    cardService.markCompleted = function(card) {
      Restangular.one('cards', card.id).remove()
        .then( function() {
          boardService.removeCard(card);
      })
    };


    return cardService;

}]);