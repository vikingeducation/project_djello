app.controller('BoardsIndexCtrl',
['$scope', 'boardsData', 'usersCache', 'BoardService',
function($scope, boardsData, usersCache, BoardService) {

  $scope.boardsData = boardsData;
  $scope.usersCache = usersCache;

  $scope.refreshBoards = function(data) {
    $scope.boardsData = data;
  };

  $scope.logError = function(reason) {
    console.log('ERROR!! Reason:');
    console.log(reason);
  };

}]);
