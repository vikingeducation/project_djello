app.controller('BoardsIndexCtrl',
['$scope', 'boardsData', 'usersData', 'BoardService',
function($scope, boardsData, usersData, BoardService) {

  $scope.boardsData = boardsData;
  $scope.usersData = usersData;

  $scope.refreshBoards = function(data) {
    $scope.boardsData = data;
  };

}]);
