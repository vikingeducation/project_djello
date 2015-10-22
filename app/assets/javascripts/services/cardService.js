djello.factory('cardService',
  ['Restangular',
  function(Restangular) {

    var cardService = {};


    cardService.create = function(list) {
      return Restangular.all('cards').post( { list_id: list.id } )
    };


    return cardService;

}]);