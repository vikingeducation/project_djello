djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', function($scope, $state, BoardsService, currentUser) {

  $scope.formData = {};
  $scope.lists = [];

  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;

      for(var i=0; i < $scope.boards.length; i++){
        $scope.lists.push($scope.boards[i].list)
      }
    });


  $scope.changeState = function(board) {
    if(board){
      $state.go('boards.show', { id: board.id })
    } 
  }

  $scope.createBoard = function(formIsValid) {
    if (formIsValid) {
      $scope.formData["user_id"] = currentUser.id;
      var board = BoardsService.createBoard($scope.formData).$object;
      $scope.boards.unshift(board);
      $scope.formData = {};
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
