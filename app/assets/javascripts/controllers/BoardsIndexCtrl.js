app.controller("BoardsIndexCtrl", ["$scope", "boardsService", function($scope, boardsService) {

  boardsService.all().then(function(response) {
    console.log(response)
    $scope.boards = response
  })

  $scope.message = "Index page"
}])