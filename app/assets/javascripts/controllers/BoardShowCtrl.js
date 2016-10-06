app.controller("BoardShowCtrl", ["$stateParams", "$state", "$scope", "boardsService", function($stateParams, $state, $scope, boardsService) {
  $scope.message = "Board Show"
  $scope.board = boardsService.find($stateParams.id)
  $scope.deleteBoard = function() {
    $scope.board.remove();
    $state.go("boardsIndex")
  }
}])