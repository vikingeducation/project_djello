app.controller('BoardsIndexCtrl',
['$scope', 'boardsData', 'usersData', 'BoardService', 'noticeData',
function($scope, boardsData, usersData, BoardService, noticeData) {

  $scope.boardsData = boardsData;
  $scope.usersData = usersData;
  $scope.noticeData = noticeData;

}]);
