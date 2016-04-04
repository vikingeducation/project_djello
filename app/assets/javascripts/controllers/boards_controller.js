djello.controller('BoardsCtrl', ['$scope', '$state', 'BoardsService', 'currentUser', '$stateParams', 'ListsService', function($scope, $state, BoardsService, currentUser, $stateParams, ListsService) {


  $scope.formData = {};
  $scope.currentLists = ListsService.currentLists;


  BoardsService.getBoardsForUser(currentUser).then(
    function(data) {
      $scope.boards = data.boards;
    });


  var setCurrentBoard = function(board) {
    var currentBoard = _.filter($scope.boards, {id: board.id})[0];
    $scope.board = currentBoard;
    BoardsService.currentBoardId = currentBoard["id"];

    // also reset the current lists
    if (currentBoard["lists"]) {
      ListsService.currentLists.length = 0;
      for (var i = 0; i < currentBoard["lists"].length; i++) {
        ListsService.currentLists.push(currentBoard["lists"][i]);
      }
    }
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
        console.log(BoardsService.currentBoardId)
        $scope.formData = {};
        $state.go("boards.show", {id: board.id})
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
