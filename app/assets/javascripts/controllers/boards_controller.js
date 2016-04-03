djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', '$stateParams', function($scope, $state, BoardsService, currentUser, $stateParams) {


  $scope.formData = {};
  $scope.currentBoardId;




  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;
    });


  var findCurrentBoard = function() {
    console.log($scope.currentBoardId)
    console.log(_.filter($scope.boards, {id: $scope.currentBoardId}))
    return _.filter($scope.boards, {id: $scope.currentBoardId});
    // return $filter('filter')($scope.boards, {id: id})[0];
  }

  // $scope.currentBoard = findCurrentBoard($stateParams.id)

  $scope.currentBoard = findCurrentBoard(); 
  // _.filter($scope.boards, {"id": 59});


  $scope.changeState = function(board) {
    if (board) {
      $state.go('boards.show', { id: board.id })
      $scope.currentBoardId = board.id
      // console.log("currentBoardId: " + $scope.currentBoardId)
      // console.log($scope.boards)
      // console.log(_.filter($scope.boards, {id: $scope.currentBoardId}))
    } 
  }


  $scope.createBoard = function(formIsValid) {
    if (formIsValid) {
      $scope.formData["user_id"] = currentUser.id;
      BoardsService.createBoard($scope.formData).then(function(board){
        $scope.boards.unshift(board);
        $state.go("boards.show", {id: board.id})
        $scope.formData = {};
      });
      
    }
  }


  $scope.deleteBoard = function(board){
   BoardsService.deleteBoard(board)
    .then(function(deletedBoard){
      for(var i = 0; i < $scope.boards.length; i++){
        if (deletedBoard.id === $scope.boards[i].id){
          $scope.boards.splice(i,1);
        }
      }
      $state.go("boards");
    })
  }



}]);
