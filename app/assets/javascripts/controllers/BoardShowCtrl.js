app.controller("BoardShowCtrl", ["$stateParams", "$scope", "boardsService", function($stateParams, $scope, boardsService) {
  $scope.message = "Board Show"
  $scope.board = boardsService.find($stateParams.id)

}])