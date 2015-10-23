djello.factory('listService',
  ['Restangular',
  function(Restangular) {

    var listService = {};

    listService.lists = [];


    listService.setLists = function(boards) {
      boards.forEach( function(board) {
        listService.lists = listService.lists.concat(board.lists);
      });
      return listService.lists;
    }


    listService.getLists = function(board) {
      return board.lists;
    };


    listService.create = function(board) {
      return Restangular.all('lists').post( { board_id: board.id } )
    };


    listService.findByID = function(board, id) {
      return board.lists.filter( function(list) {
        return (list.id === Number(id))
      })[0];
    };


    listService.findByID2 = function(id) {
      return listService.lists.filter( function(list) {
        return (list.id === Number(id))
      })[0];
    }


    return listService;

}]);