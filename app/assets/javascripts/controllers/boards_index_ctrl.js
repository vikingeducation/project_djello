app.controller('BoardsIndexCtrl',
['$scope', 'boardsCache', 'usersCache', 'BoardService',
function($scope, boardsCache, usersCache, BoardService) {

  $scope.boardsCache = boardsCache;
  $scope.usersCache = usersCache;

  $scope.refreshBoards = function(data) {
    $scope.boardsCache = data;
  };

  $scope.logError = function(reason) {
    console.log('ERROR!! Reason:');
    console.log(reason);
  };

}]);
