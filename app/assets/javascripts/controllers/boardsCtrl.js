app.controller("BoardsCtrl",
              ["$scope", "Restangular", "UserService", 'userPromise', '$location', "BoardService",
              function($scope, Restangular, UserService, userPromise, $location, BoardService){
  if (!userPromise) {
    $location.path('/')
  };

  $scope.boards = BoardService.boards;
  // $scope.selectedBoard = $scope.boards.list[0].id

}])