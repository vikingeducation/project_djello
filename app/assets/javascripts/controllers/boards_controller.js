djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', '$stateParams', function($scope, $state, BoardsService, currentUser, $stateParams) {


  $scope.formData = {};


  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;
    });


  var setCurrentBoard = function() {
    var currentBoard = _.filter($scope.boards, {id: $scope.currentBoardId});
    $scope.currentBoard = currentBoard;
    BoardsService.currentBoardId = currentBoard[0]["id"];
    // console.log($scope.currentBoard);
    // console.log(BoardsService.currentBoard[0]["id"])
  }


  $scope.changeState = function(board) {
    if (board) {
      $state.go('boards.show', { id: board.id })
      $scope.currentBoardId = board.id
      setCurrentBoard();
      $scope.currentLists = $scope.currentBoard[0].lists
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
