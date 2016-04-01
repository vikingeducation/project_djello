djello.controller('BoardsCtrl', ['$scope', '$state', 'GetBoardsService', function($scope, $state, GetBoardsService) {

  $scope.boards = GetBoardsService.getBoardsForUser();


  $scope.changeState = function(board) {
    console.log(board)
    console.log("board id: " + board.id)
    $state.go('boards.show', { id: board.id })
  }



}]);
