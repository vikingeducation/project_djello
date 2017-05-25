djello.controller('indexBoardsCtrl',
  ['$scope', 'boards',
  function($scope, boards) {

    $scope.boards = boards;

    $scope.$on('board.created', function(event, board) {
      $scope.boards.unshift(board);
    });

    $scope.$on('board.deleted', function(event, board) {
      boardService.getAll()
                  .then( function(response) {
                    angular.copy(response, $scope.boards)
                  })
    });

  }])