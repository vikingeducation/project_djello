djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', function($scope, $state, BoardsService, currentUser) {

  $scope.formData = {};
  $scope.allLists = [];

  // $scope.boardLists = [all lists for 58, all lists for 59]

  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;

      // for(var i=0; i < $scope.boards.length; i++){
      //   $scope.lists.push($scope.boards[i].list)
      // }
      $scope.allLists = data.lists;
      console.log($scope.allLists)
    });


  $scope.changeState = function(board) {
    if(board){
      $state.go('boards.show', { id: board.id })
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
