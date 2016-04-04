djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', '$stateParams', 'ListsService', function($scope, $state, BoardsService, currentUser, $stateParams, ListsService) {


  $scope.formData = {};


  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;
    });


  var setCurrentBoard = function(board) {
    var currentBoard = _.filter($scope.boards, {id: board.id})[0];
    $scope.currentBoard = currentBoard;
    BoardsService.currentBoardId = currentBoard["id"];
    // also set the current lists
    ListsService.currentLists = currentBoard["lists"] || [];
  }


  $scope.changeState = function(board) {
    if (board) {
      setCurrentBoard(board);
      $state.go('boards.show', { id: board.id });
    } 
  }


  $scope.createBoard = function(formIsValid) {
    if (formIsValid) {
      $scope.formData["user_id"] = currentUser.id;
      BoardsService.createBoard($scope.formData).then(function(board){
        $scope.boards.unshift(board);
        setCurrentBoard(board);
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


  $scope.deleteList = function(list) {
    ListsService.deleteList(list);
  }



}]);
