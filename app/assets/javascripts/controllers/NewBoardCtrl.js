app.controller("NewBoardCtrl", ["$scope", "boardsService", "$state", function($scope, boardsService, $state) {
  $scope.board = {}

  $scope.handleForm = function() {
    boardsService.create($scope.board)
    $state.go("main")
  }

}])