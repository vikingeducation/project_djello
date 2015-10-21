djello.factory('listService',
  ['Restangular'
  function(Restangular) {

    var listService = {};


    listService.create = function(board) {
      Restangular.all('lists').post($scope.newBoard)
    }


    return listService;

}]);