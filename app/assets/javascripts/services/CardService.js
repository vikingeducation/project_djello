djello.factory('CardService', ['Restangular', '$state', function(Restangular, $state) {
  
  var cardService = {};

  cardService.createCard = function(listId, boardId){
    return Restangular.all('cards').post({
      boardId: boardId,
      listId: listId
    })
  }



  return cardService;

}]);