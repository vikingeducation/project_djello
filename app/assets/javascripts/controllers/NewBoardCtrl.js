app.controller("NewBoardCtrl", ["$scope", "boardsService", "$state", function($scope, boardsService, $state) {
  $scope.board = {}

  $scope.boards = boardsService.all().$object

  $scope.handleForm = function() {
    boardsService.create($scope.board)
    $state.go("boardsIndex")
  }

  

}])