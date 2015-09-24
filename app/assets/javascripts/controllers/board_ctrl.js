djello.controller('boardCtrl', ['$scope', 'Restangular', 'boards', 'currentUser',
  function($scope, Restangular, boards, currentUser){
  $scope.boards = boards;
  console.log("current User", currentUser);
  $scope.currentUser = currentUser;

  $scope.createBoard = function() {
    var post = Restangular.all('boards').post({
      board: {
        name: $scope.board.name,
        user_id: currentUser.id
      }
    })

    post.then(function(response){
      $scope.boards.push(response);
      $scope.board = {};
    })
  }

  $scope.remove = function(board){
    board.remove().then(function(){
      $scope.boards.splice($scope.boards.indexOf(board), 1)
    })
  }












  //
}])