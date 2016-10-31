djello.factory('CardService', ['Restangular', '$state', function(Restangular, $state) {
  
  var cardService = {};

  cardService.createCard = function(listId, boardId){
    return Restangular.all('cards').post({
      boardId: boardId,
      listId: listId
    });
  }

  cardService.changeList = function(cardId, listId) {
    return Restangular.one('cards', cardId).patch({
      list_id: listId
    })
  }



  return cardService;

}]);