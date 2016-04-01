djello.factory('GetBoardsService', ['Restangular', 'Auth',function(Restangular, Auth) {

  var getBoardsForUser = function() {
    var boards = Auth.currentUser().then(
        function(user){ 
        return Restangular.one('users', user.id).getList('boards')})
    return boards;
  };

  // var createBoard = function(boardObj) {
  //   return Restangular.all('boards').post(boardObj);
  // };

  // var updateBoard = function(id) {
  //   return Restangular.one('boards', id).get();
  // }



  return {
    getBoardsForUser: getBoardsForUser
    // ,
    // createBoard: createBoard,
    // updateBoard: updateBoard
  }




}]);