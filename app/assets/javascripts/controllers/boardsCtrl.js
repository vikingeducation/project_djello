app.controller("BoardsCtrl",
              ["$scope", "Restangular", "UserService", 'userPromise', '$location', "BoardService",
              function($scope, Restangular, UserService, userPromise, $location, BoardService){
  if (!userPromise) {
    $location.path('/')
  };

  $scope.boards = BoardService.boards;
  // $scope.selectedBoard = $scope.boards.list[0].id

  var deleteBoard = function() {
    var id = $scope.selectedBoard
    Restangular.one("boards", id).get().then(function(board) {
      board.remove();
      for (var i = 0; i < $scope.boards.length; i++) {
        if ($scope.boards[i].id === board.id) {
          return $scope.boards.splice(i, 1);
        }
      };
    })
  }

}])