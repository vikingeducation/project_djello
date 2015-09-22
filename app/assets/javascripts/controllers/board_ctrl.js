djello.controller('boardCtrl', ['$scope', 'Restangular', 'boards', 'userService', 'currentUser',
  function($scope, Restangular, boards, userService, currentUser){
  $scope.boards = boards;
  console.log("current User", currentUser);

  $scope.createBoard = function() {
    Restangular.all('boards').post({
      board: {
        name: $scope.board.name,
        user_id: currentUser.id
      }
    })
  }
}])