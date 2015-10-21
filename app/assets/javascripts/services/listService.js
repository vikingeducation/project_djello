djello.factory('listService',
  ['Restangular',
  function(Restangular) {

    var listService = {};


    listService.getLists = function(board) {
      return board.lists;
    };


    listService.create = function(board) {
      var list = { title: 'New List', board_id: board.id };
      Restangular.all('lists').post(list)
    };


    listService.update = function() {
      /*if (valid) {
        Restangular.one('pins', $stateParams.id).patch($scope.editPin)
          .then( $scope.redirectToShow );
      };*/
    }


    return listService;

}]);