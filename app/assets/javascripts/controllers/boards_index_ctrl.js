app.controller('BoardsIndexCtrl',
['$scope', 'boards', 'BoardService',
function($scope, boards, BoardService) {

  $scope.boards = boards;

  $scope.refreshBoards = function(data) {
    $scope.boards = data;
  };

  $scope.logError = function(reason) {
    console.log('ERROR!! Reason:');
    console.log(reason);
  };

  $scope.$on('board.create', function(response) {
    BoardService.refreshCache()
      .then($scope.refreshBoards)
      .catch($scope.logError);
  });

}]);
