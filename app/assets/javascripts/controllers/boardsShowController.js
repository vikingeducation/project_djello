djello.controller('BoardsShowCtrl', ['$scope', '$timeout', 'board', 'BoardService', '$stateParams', 'boards', '$state', function($scope, $timeout, board, BoardService, $stateParams, boards, $state){

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

  $scope.editTitle = function(){
    console.log("Firing edit title");
    $scope.toggleTitleEditing();
    $timeout(function(){
      $('#titleEdit').focus();
    }, 200);
  }


  $scope.createBoard = function(){
    BoardService.createBoard()
    .then(function(response){
      $state.go('boards.show', {id: response.id})
    })
  }

  $scope.createList = function(){
    $scope.board.createList();
  }

  
}])