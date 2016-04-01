djello.factory('GetBoardsService', ['Restangular', function(Restangular) {

  var getBoards = function() {
    return Restangular.all('boards').getList().$object;
  };

  // var createBoard = function(boardObj) {
  //   return Restangular.all('boards').post(boardObj);
  // };

  // var updateBoard = function(id) {
  //   return Restangular.one('boards', id).get();
  // }



  return {
    getBoards: getBoards
    // ,
    // createBoard: createBoard,
    // updateBoard: updateBoard
  }




}]);