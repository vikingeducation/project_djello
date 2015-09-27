djello.controller('boardCtrl', ['$scope', 'Restangular', 'boardService', 'currentUser',
  function($scope, Restangular, boardService, currentUser){
  $scope.currentUser = currentUser;
  $scope.boards = boardService.boards;

  // To populate the boardList in boardService
  boardService.getBoards();

  console.log("current User", $scope.currentUser);

  $scope.createBoard = function() {
    $scope.boardForm.user_id = currentUser.id;
    boardService.createBoard($scope.boardForm);
  }

  $scope.removeBoard = function(board, $event){
    $event.preventDefault();
    $event.stopPropagation();
    boardService.removeBoard(board);
  }

}])