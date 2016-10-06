djello.controller('BoardsShowCtrl', ['$scope', 'board', 'BoardService', '$stateParams', 'boards', '$state', function($scope, board, BoardService, $stateParams, boards, $state){

  $scope.board = board;
  $scope.boards = boards;
  $scope.titleEditing = false;

  $scope.toggleTitleEditing = function() {
    $scope.titleEditing = !$scope.titleEditing;
  };

  $scope.updateTitle = function(){
    $scope.titleEditing = false;
    $scope.board.save().then(function(response){
      BoardService.getBoards();
    });
  };

  $scope.changeBoard = function(){
    $state.go('boards.show', {id: $scope.selectedBoard.id})
  };

  $scope.deleteBoard = function(){
    $scope.board.remove().then(function(response){
      BoardService.getBoards();
      $state.go('boards.index');
    })
  }


  $scope.createBoard = function(){
    BoardService.createBoard()
    .then(function(response){
      $state.go('boards.show', {id: response.id})
    })
  }

  
}])