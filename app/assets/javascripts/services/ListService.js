djello.factory('ListService', ['Restangular', 'CardService', '$state', function(Restangular, CardService, $state) {
  
  var listService = {};

  listService.createList = function(boardId){
    return Restangular.all('lists').post({
      boardId: boardId
    });
  }

  Restangular.extendModel('lists', function(model){
    model.createCard = function(boardId){
      console.log(model);
      return CardService.createCard(model.id, boardId)
      .then(function(response){
        model.cards.push(response);
      });
    };
    return model;
  })



  return listService;

}]);