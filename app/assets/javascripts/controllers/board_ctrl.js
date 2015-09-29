djello.controller('boardCtrl', ['$scope', 'Restangular', 'boardService', 'sessionService',
  function($scope, Restangular, boardService, sessionService){
  $scope.currentUser = sessionService.currentUser;
  $scope.boards = boardService.boards;

  // To populate the boardList in boardService
  boardService.getBoards();

  console.log("current User", $scope.currentUser.user);

  $scope.createBoard = function() {
    $scope.boardForm.user_id = currentUser.user.id;
    boardService.createBoard($scope.boardForm);
  }

  $scope.removeBoard = function(board, $event){
    $event.preventDefault();
    $event.stopPropagation();
    boardService.removeBoard(board);
  }

}])