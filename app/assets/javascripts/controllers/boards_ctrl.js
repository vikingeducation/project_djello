Djello.controller('BoardsCtrl', ['$scope', 'BoardService', function($scope, BoardService){

  BoardService.getAllBoards()
    .then(function(response){
      console.log(response)
    $scope.boards = response;
  })

  $scope.createBoard = function(board) {
    BoardService.createBoard(board).then(function(response) {
      debugger
      $scope.boards.push(response.plain)
    })
  }

}])
