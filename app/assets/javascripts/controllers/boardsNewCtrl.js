app.controller("BoardsNewCtrl",
              ["$scope", "Restangular", "UserService", "BoardService", '$location',
              function($scope, Restangular, UserService, BoardService, $location){

  $scope.board = { user_id: UserService.currentUser.user.id }

  $scope.createBoard = function(){
    Restangular.all('boards').post({ board : $scope.board,
                                }).then(function(response){
                                  console.log(response)
                                  console.log(BoardService.boards)
                                  BoardService.boards.list.push(response)
                                  $location.path("/boards")
                                });
  }
}])