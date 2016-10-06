app.controller('BoardsIndexCtrl',
['$scope', 'boards', function($scope, boards) {

  $scope.boards = boards;

}]);
