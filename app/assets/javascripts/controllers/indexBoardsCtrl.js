djello.controller('indexBoardsCtrl',
  ['$scope', 'boards',
  function($scope, boards) {

    $scope.boards = boards;

    $scope.$on('board.created', function(event, response) {
      $scope.boards.unshift(response);
    });

  }])