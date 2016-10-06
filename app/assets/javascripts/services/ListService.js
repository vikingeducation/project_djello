djello.factory('ListService', ['Restangular', '$state', function(Restangular, $state) {
  
  var listService = {};

  listService.createList = function(board_id){
    return Restangular.all('lists').post({
      board_id: board_id
    })
  }



  return listService;

}]);