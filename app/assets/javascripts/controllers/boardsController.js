djello.controller('BoardsCtrl', ['$scope', 'boards', 'BoardService', '$state', function($scope, boards, BoardService, $state){

  $scope.boards = boards;

  $scope.noBoards = function(){
    return $scope.boards.length < 1
  }

  $scope.createBoard = function(){
    BoardService.createBoard()
    .then(function(response){
      $state.go('boards.show', {id: response.id})
    })
  }
  
}])