djello.factory('listService',
  ['Restangular',
  function(Restangular) {

    var listService = {};


    listService.getLists = function(board) {
      console.log(board.lists);
      return board.lists;
    };


    listService.create = function(board) {
      var list = { title: 'New List', board_id: board.id };
      Restangular.all('lists').post(list)
    };


    return listService;

}]);