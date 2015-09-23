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
      $scope.boards.push(response)
    })
  }

  $scope.remove = function(id, index){
    console.log("removing a board")
    var board = Restangular.one('boards', id).get()
    board.then(function(response){
      console.log(response)
      response.remove().then(function(){
        $scope.boards.splice(index, 1)
      });
    })
  }
}])