djello.factory('listService',
  ['Restangular',
  function(Restangular) {

    var listService = {};

    listService.create = function(board) {
      return Restangular.all('lists').post( { board_id: board.id } );
    };

    listService.getLists = function(board) {
      return board.lists;
    };

    return listService;

  }]);