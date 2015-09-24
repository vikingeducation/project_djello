djello.controller('boardCtrl', ['$scope', 'Restangular', 'boards', 'currentUser',
  function($scope, Restangular, boards, currentUser){
  $scope.boards = boards;
  $scope.edit = {};
  $scope.currentUser = currentUser;
  $scope.boardName = {};

  $scope.createBoard = function() {
    var post = Restangular.all('boards').post({
      board: {
        name: $scope.board.name,
        user_id: currentUser.id
      }
    })

    post.then(function(response){
      $scope.boards.push(response)
      $scope.board.name = ""
    })
  }

  $scope.remove = function(board){
    board.remove().then(function(){
      $scope.boards.splice($scope.boards.indexOf(board), 1)
    })
  }


  $scope.editBoardName = function(board){
    // debugger
    $scope.boardName[board.id] = board.name;
    $scope.edit[board.id] = !$scope.edit[board.id]
  }

   $scope.cancelEdit = function(board){
    // debugger
    $scope.boardName[board.id] = ""
    $scope.edit[board.id] = !$scope.edit[board.id]
  }

  $scope.saveBoardName = function(board, newName){
    var put = Restangular.one('boards', board.id);
    put.name = newName;
    put.put()

    .then(function(response){
      board.name = newName;
      $scope.boardName[board.id] = ""
      $scope.edit[board.id] = !$scope.edit[board.id]

    })
    //
    //

  }










  //
}])