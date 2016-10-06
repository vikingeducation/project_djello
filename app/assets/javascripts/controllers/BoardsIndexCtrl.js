app.controller("BoardsIndexCtrl", ["$scope", "boardsService", "$state", function($scope, boardsService, $state) {

  boardsService.all().then(function(response) {
    $scope.boards = response
  })

  $scope.sendToShow = function(board) {
    console.log(board)
    $state.go("boards", board.id)
  }

  $scope.message = "Index page"
}])