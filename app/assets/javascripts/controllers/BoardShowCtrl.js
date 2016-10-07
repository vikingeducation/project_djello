app.controller("BoardShowCtrl", ["$stateParams", "$state", "$scope", "_", "boardsService", "boards", function($stateParams, $state, $scope, _, boardsService, boards) {
  $scope.message = "Board Show"

  $scope.boards = boards
  $scope.board = boardsService.find($stateParams.id)

  $scope.selectedBoard = $scope.selectedBoard || $scope.board

  // $scope.$watch('selectedBoard', function(newBoard) {
  //    if ($scope.selectedBoard) {
  //     $state.go("boardShow", {id: $scope.selectedBoard.id})
  //   }
  // })

  console.log(boards)
  $scope.deleteBoard = function() {
    $scope.board.remove();
    $state.go("boardsIndex")
  }
  $scope.switchBoards = function() {
    console.log("changing to " + $scope.selectedBoard.title)
    return $state.go("boardShow", {id: $scope.selectedBoard.id})
  }
}])