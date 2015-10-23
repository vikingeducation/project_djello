djello.factory('cardService',
  ['Restangular', 'listService',
  function(Restangular, listService) {

    var cardService = {};


    cardService.create = function(list) {
      return Restangular.all('cards').post( { list_id: list.id } )
    };


    cardService.findByID = function(list, id) {
      return list.cards.filter( function(card) {
        return (card.id === Number(id))
      })[0];
    };


    return cardService;

}]);