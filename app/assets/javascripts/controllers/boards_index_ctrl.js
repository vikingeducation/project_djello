app.controller('BoardsIndexCtrl',
['$scope', 'boardsCache', 'BoardService',
function($scope, boardsCache, BoardService) {

  $scope.boardsCache = boardsCache;

  $scope.refreshBoards = function(data) {
    $scope.boardsCache = data;
  };

  $scope.logError = function(reason) {
    console.log('ERROR!! Reason:');
    console.log(reason);
  };

}]);
